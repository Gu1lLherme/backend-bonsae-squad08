import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { CreateTurmaBatchDto } from './dto/create-turma-batch.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, isValidObjectId } from 'mongoose';
import { Turma, TurmaDocument, TurmaSchema } from './schemas/turmas.schema';
import { LoteImportacao, LoteImportacaoDocument } from '../lote-importacao/schemas/lote-importacao.schema';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { count } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { TurmaSQLEntity } from './entities/turma-sql.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TurmasService {
  /*
  @InjectRepository(TurmaSQLEntity)
  private readonly turmaSqlRepo: Repository<TurmaSQLEntity>;

  @InjectModel("Turma")
   private readonly turmaMongoModel: Model<any>;
   */

  constructor(@InjectModel(Turma.name) private turmaModel: Model<TurmaDocument>, 
  @InjectConnection() private readonly connection: Connection,) {}


  async create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
 

    // Verifica se a turma já existe
    const turmaExistente = await this.turmaModel.findOne({ codigoTurma: createTurmaDto.codigoTurma });
    if (turmaExistente) {
      throw new BadRequestException('A turma já existe.');
    }

    // Cria a nova turma
    const novaTurma = new this.turmaModel(createTurmaDto);
    return await novaTurma.save();
    
  }
  async findAll(): Promise<Turma[]> {
    return this.turmaModel.find().populate('usuarios').exec();
  }

  async findOne(id: string): Promise<Turma> {
    const turma = await this.turmaModel.findById(id).populate('usuarios').exec();
    if (!turma) {
      throw new NotFoundException('Turma não encontrada.');
    }
    return turma;
  }

  async update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    const updated = await this.turmaModel.findByIdAndUpdate(id, updateTurmaDto, { new: true });
    if (!updated) {
      throw new NotFoundException('Turma não encontrada para atualização.');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const turma = await this.turmaModel.findById(id);
    if (!turma) {
      throw new NotFoundException('Turma não encontrada para exclusão.');
    }
    await turma.deleteOne();
  }
// Validação de turmas em lote
  async bulkCreate(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]> {
    if (!Array.isArray(createTurmasDto)) {
      throw new BadRequestException('Payload precisa ser um array de objetos Turma.');
    }

    if (createTurmasDto.length === 0) {
      throw new BadRequestException('A lista de turmas não pode ser vazia.');
    }

    const erros: { index: number, error: string }[] = [];

    const turmasValidas = createTurmasDto.filter((turma, index) => {
      const problemas: string[] = [];

      if (!turma.codigoDisciplina || turma.codigoDisciplina.trim() === '') {
        problemas.push('Código da disciplina é obrigatório.');
      }
      if (!turma.turno || !['Manhã', 'Tarde', 'Noite'].includes(turma.turno)) {
        problemas.push('Turno inválido. Deve ser Manhã, Tarde ou Noite.');
      }
      if (!turma.codigoTurma || turma.codigoTurma.trim() === '') {
        problemas.push('Código da turma é obrigatório.');
      }
      if (!turma.nomeTurma || turma.nomeTurma.trim() === '') {
        problemas.push('Nome da turma é obrigatório.');
      }
      if (!turma.tipo || !['aluno', 'professor'].includes(turma.tipo)) {
        problemas.push('Tipo inválido. Deve ser aluno ou professor.');
      }

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
        return false;
      }
      return true;
    });

    if (turmasValidas.length === 0) {
      throw new BadRequestException({
        message: 'Nenhuma turma válida foi enviada.',
        erros,
      });
    }

    if (erros.length > 0) {
      console.warn('Algumas turmas foram rejeitadas:', erros);
    }

    const insertedTurmas = await this.turmaModel.insertMany(turmasValidas);
    return insertedTurmas.map(turma => turma.toObject() as Turma);

  }
/* Método para criar turmas em lote com transação
  async bulkCreateWithTransaction(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]> {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const turmasCriadas = await this.turmaModel.insertMany(createTurmasDto, { session });

      await session.commitTransaction();
      session.endSession();
      return turmasCriadas;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Erro no bulkCreateWithTransaction:', error);
      throw new InternalServerErrorException('Erro ao criar turmas em lote.');
    }*/
  /*async createBatch(dto: CreateTurmaBatchDto) {
    const batchId = uuidv4();
    const documents = dto.turmas.map(turma => {

    const errors: string[] = [];

    if (!['manhã', 'tarde', 'noite'].includes(turma.turno.toLowerCase())) {
  errors.push(`Turno inválido: ${turma.turno}`);
    }
    if (!turma.codigoDisciplina || !turma.codigoTurma || !turma.nomeTurma) {
      errors.push('Campos obrigatórios ausentes');
    }

    return {
      ...turma,
      batchId,
      valid: errors.length === 0,
      validationErrors: errors,
    };
});
const saved = await this.turmaModel.insertMany(documents, { ordered: false });
return {
  batchId,
  turmas: saved,
};
}*/
async createBatch(dto: CreateTurmaBatchDto): Promise<{ batchId: string; turmas: any[] }> {
  const batchId = uuidv4();
  const turmas = dto.turmas;

  const turmasComStatus = turmas.map((turma) => {
    const instance = plainToInstance(CreateTurmaDto, turma);
    const errors = validateSync(instance);

    const validationErrors = errors.map((e) =>
      Object.values(e.constraints || {}).join(', ')
    );

    return {
      ...turma,
      batchId,
      valid: validationErrors.length === 0,
      validationErrors,
    };
  });

  // Salva todas, válidas ou não
  await this.turmaModel.insertMany(turmasComStatus); 

  return {
    batchId,
    turmas: turmasComStatus,
  };
}

async updateInvalidTurmas(id: string, updateDto: UpdateTurmaDto): Promise<any> {

  if (!isValidObjectId(id)) {
    throw new BadRequestException('ID inválido.');
  }

  const instance = plainToInstance(UpdateTurmaDto, updateDto);
  const errors = validateSync(instance);

  const validationErrors = errors.map((e) =>
    Object.values(e.constraints || {}).join(', ')
  );

  const valid = validationErrors.length === 0;

  const turma = await this.turmaModel.findByIdAndUpdate(
    
    id,
    {
    $set: { ...updateDto, 
      valid, 
      validationErrors ,}
    },
    { new: true }
  );

  if (!turma) {
    throw new NotFoundException('Turma não encontrada.');
    
  }
  return {
    message: 'Turma atualizada com sucesso!',
    data: turma,
  };
}


// ainda precisa de testes.
/*
async salvarValidasSql(batchId: string) {
  const turmasValidas = await this.turmaMongoModel.find(
    { batchId, valid: true }
  ).lean();

  
  const entidades = turmasValidas.map((turma) => 
    this.turmaSqlRepo.create({ 
      codigoDisciplina: turma.codigoDisciplina,
      turno: turma.turno,
      codigoTurma: turma.codigoTurma,
      nomeTurma: turma.nomeTurma,
      tipo: turma.tipo,
      usuarios: turma.usuarios ?? [],
     }),
    );
 
  await this.turmaSqlRepo.save(entidades);
  return { count: entidades.length };
}*/
}
