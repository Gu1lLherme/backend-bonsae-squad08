import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, isValidObjectId } from 'mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { CreatePeriodoLetivoBatchDto } from './dto/create-periodo-letivo-batch.dto';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import {v4 as uuidv4} from "uuid";
import { UpdateUsuarioDto } from '../usuario/dto/update-usuario.dto';
import { EtapaImportacao, StatusImportacao } from 'src/processo-importacao/schemas/processo-importacao.schema';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
import 'src/processo-importacao/schemas/processo-importacao.schema'
@Injectable()
export class PeriodoLetivoService {
  
  constructor(
    @InjectModel(PeriodoLetivo.name) private periodoLetivoModel: Model<PeriodoLetivoDocument>,
    private readonly processoImportacaoService: ProcessoImportacaoService,
  ) {}

  

async createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<any> {
  // Usa o processId vindo do DTO, ou gera um novo UUID se não enviado
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

  const batchId = uuidv4(); // Gera um novo ID de lote

  const periodosLetivos = dto.periodos;

  const periodosComStatus = periodosLetivos.map((periodo) => {
    // Transformar cada item em uma instância da CreatePeriodoLetivoDto (não CreatePeriodoLetivoBatchDto)
    const instance = plainToInstance(CreatePeriodoLetivoDto, periodo);
    const errors = validateSync(instance);

    const validationErrors = errors.flatMap((e) =>
      Object.values(e.constraints || {}).join(', ')
    );

    return {
      ...periodo,
      processId: processId ,// Associa ao processo de importação
      valid: validationErrors.length === 0,
      validationErrors,
    };
  });

  await this.periodoLetivoModel.insertMany(periodosComStatus);
  await this.processoImportacaoService.marcarEtapaConcluida(processId, 'periodo-letivo');

  return {
    batchId: processId,
    periodos: periodosComStatus,
  };
}


  /*async createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<{batchId: string; periodos: any[]}> {
  const batchId = dto.processId || uuidv4();
  const periodosLetivos = dto.periodos;

  const periodosComStatus = periodosLetivos.map((periodo) => {
    const instance = plainToInstance(CreatePeriodoLetivoBatchDto, periodo);
    const errors = validateSync(instance);

    const validationErrors = errors.flatMap((e) =>
      Object.values(e.constraints || {}).join (', '));

    return {
      ...periodo,
      processId: batchId,
      valid: validationErrors.length === 0,
      validationErrors,
    };
  });

  

  await this.periodoLetivoModel.insertMany(periodosComStatus)

  return {
    batchId,
    periodos: periodosComStatus,
  };
}*/

async updateInvalidPeriodos(id: string, updateDto: UpdatePeriodoLetivoDto): Promise <any> {

  if (!isValidObjectId(id)) {
    throw new BadRequestException("ID invalido")
  }

  const instance = plainToInstance(UpdatePeriodoLetivoDto, updateDto);
  const errors = validateSync(instance);

  const validationErrors = errors.map((e) => 
  Object.values(e.constraints || {}).join(', '));

  const valid = validationErrors.length ===0;

  const periodo = await this.periodoLetivoModel.findByIdAndUpdate(

    id,
    {
      $set: {
        ...updateDto,
        valid,
        validationErrors,}
      },
      { new: true}
    
  );

  if (!periodo) {
    throw new NotFoundException('Usuário não encontrado');
  }
  return {
    message: 'Usuario Atualizado com sucesso',
    date: periodo,
  }
}

}