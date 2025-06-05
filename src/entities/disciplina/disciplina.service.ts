import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, isValidObjectId } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schemas/disciplina.schema';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
import { StatusImportacao, EtapaImportacao } from 'src/processo-importacao/schemas/processo-importacao.schema';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    private readonly processoImportacaoService: ProcessoImportacaoService){}

  async create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina> {
    // Verifica se a disciplina já existe

    const disciplinaExistente = await this.disciplinaModel.findOne({ codigoDisciplina: createDisciplinaDto.codigoDisciplina });
        if (disciplinaExistente) {
          throw new BadRequestException('A disciplina já existe.');
        }

    // Cria a nova disciplina
    const novaDisciplina = new this.disciplinaModel(createDisciplinaDto);
    return novaDisciplina.save();
  }



  async createBatch(dto: CreateDisciplinaBatchDto): Promise<any> {
    const processId = dto.processId;

    if (!processId) {
            throw new BadRequestException('processId é obrigatório');
          }
          const processo = await this.processoImportacaoService.getProcessoById(processId);
          if (processo.status !== StatusImportacao.EM_ANDAMENTO) {
            throw new BadRequestException('Processo não está em andamento');
          }
        
          if (processo.etapaAtual !== EtapaImportacao.PERIODOS) {
            throw new BadRequestException('Processo não está na etapa de PERIODOS');
          }
          
    const disciplinas = dto.disciplinas;
    
    const disciplinasComStatus = disciplinas.map((disciplina) => {
      const instance = plainToInstance(CreateDisciplinaDto, disciplina);
      const errors = validateSync(instance);

      const validationErrors = errors.map((e) => 
        Object.values(e.constraints || {}).join(', '));
      
      return {
        ...disciplina,
        processId: processId, // Associa ao processo de importação
        valid: validationErrors.length === 0,
        validationErrors,
      };
    });

    await this.disciplinaModel.insertMany(disciplinasComStatus)
    await this.processoImportacaoService.marcarEtapaConcluida(processId, 'disciplinas');

    return {
      batchId : processId,
      disciplinas: disciplinasComStatus,
    };
}


async updateInvalidDisciplinas(id: string, updateDto: UpdateDisciplinaDto): Promise<any> {
  if (!isValidObjectId(id)) {
    throw new BadRequestException('ID inválido.');
  }

  const instance = plainToInstance(UpdateDisciplinaDto, updateDto);
  const errors = validateSync(instance);

  const validationErrors = errors.map((e) =>
    Object.values(e.constraints || {}).join(', ')
  );


  const valid = validationErrors.length === 0;

  const disciplina = await this.disciplinaModel.findByIdAndUpdate(
    id,
    {
    $set: { ...updateDto, 
        valid, 
        validationErrors ,}
    },
    { new: true }
  );

  if (!disciplina) {
    throw new NotFoundException('Disciplina não encontrada.');
  
  }
  return {
    message: valid
? 'Disciplina atualizada e validada com sucesso.'
: 'Disciplina atualizada, mas ainda contém erros de validação.',
    data: disciplina,
  };
}
  }

