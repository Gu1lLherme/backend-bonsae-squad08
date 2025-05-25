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

@Injectable()
export class PeriodoLetivoService {
  constructor(
    @InjectModel(PeriodoLetivo.name) private periodoLetivoModel: Model<PeriodoLetivoDocument>,@InjectConnection() private readonly connection: Connection,
  ) {}

  async create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): Promise<PeriodoLetivo> {
    const periodoExistente = await this.periodoLetivoModel.findOne({ codigoPeriodoLetivo: createPeriodoLetivoDto.codigoPeriodoLetivo });
    if (periodoExistente) {
      throw new BadRequestException('Código de período letivo já existente.');
    }

    if (new Date(createPeriodoLetivoDto.dataInicial) >= new Date(createPeriodoLetivoDto.dataFinal)) {
      throw new BadRequestException('Data inicial deve ser anterior à data final.');
    }

    const created = new this.periodoLetivoModel(createPeriodoLetivoDto);
    return created.save();
  }

  async bulkCreate(createPeriodosDto: CreatePeriodoLetivoDto[]): Promise<PeriodoLetivo[]> {
    if (!Array.isArray(createPeriodosDto)) {
      throw new BadRequestException('Payload precisa ser um array de objetos Periodo Letivo.');
    }

    if (createPeriodosDto.length === 0) {
      throw new BadRequestException('A lista de períodos letivos não pode ser vazia.');
    }

    

    const erros: { index: number; error: string }[] = [];

    const periodosValidados = createPeriodosDto.filter((periodo, index) => {
      const problemas: string[] = [];

      if (!periodo.codigoPeriodoLetivo || periodo.codigoPeriodoLetivo.trim() === '') {
        problemas.push('Código do período letivo é obrigatório.');
      }
      if (!periodo.periodosLetivos || periodo.periodosLetivos.trim() === '') {
        problemas.push('Nome do período letivo é obrigatório.');
      }
      if (!periodo.dataInicial || isNaN(Date.parse(periodo.dataInicial.toString()))) {
        problemas.push('Data inicial inválida ou ausente.');
      }
      if (!periodo.dataFinal || isNaN(Date.parse(periodo.dataFinal.toString()))) {
        problemas.push('Data final inválida ou ausente.');
      }
      if (new Date(periodo.dataInicial) > new Date(periodo.dataFinal)) {
        problemas.push('Data inicial não pode ser posterior à data final.');
      }

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
      }
    });

    if (erros.length > 0) {
      throw new BadRequestException({
        message: 'Alguns registros de períodos letivos são inválidos.',
        erros,
      });
    }

    const periodosInseridos = await this.periodoLetivoModel.insertMany(periodosValidados);
    return periodosInseridos.map((periodo) => periodo.toObject() as PeriodoLetivo);
  }

  async bulkCreateWithTransaction(createPeriodosDto: CreatePeriodoLetivoDto[]): Promise<PeriodoLetivo[]> {
    const session = await this.connection.startSession();
    session.startTransaction();


    try {
      const periodosCriados = await this.periodoLetivoModel.insertMany(createPeriodosDto, { session });
      await session.commitTransaction();
      session.endSession();
      return periodosCriados;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new InternalServerErrorException('Erro ao criar períodos letivos em lote.', error.message);}
      }

  async createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<{batchId: string; periodosLetivos: any[]}> {
  const batchId = dto.processId || uuidv4();
  const periodosLetivos = dto.periodos;

  const periodosComStatus = periodosLetivos.map((periodo) => {
    const instance = plainToInstance(CreatePeriodoLetivoBatchDto, periodo);
    const errors = validateSync(instance);

    const validationErrors = errors.flatMap((e) =>
      Object.values(e.constraints || {}).join (', '));

    return {
      ...periodosLetivos,
      batchId,
      valid: validationErrors.length === 0,
      validationErrors,
    };
  });

  

  await this.periodoLetivoModel.insertMany(periodosComStatus)

  return {
    batchId,
    periodosLetivos: periodosComStatus,
  };
}

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

  async findAll(): Promise<PeriodoLetivo[]> {
    return this.periodoLetivoModel.find().exec();
  }


  async findOne(id: string): Promise<PeriodoLetivo> {
    const periodo = await this.periodoLetivoModel.findById(id);
    if (!periodo) throw new NotFoundException('Período letivo não encontrado.');
    return periodo;
  }

  async update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<PeriodoLetivo> {
    const periodoAtualizado = await this.periodoLetivoModel.findByIdAndUpdate(id, updatePeriodoLetivoDto, { new: true });
    if (!periodoAtualizado) throw new NotFoundException('Período letivo não encontrado.');
    return periodoAtualizado;
  }

  async remove(id: string): Promise<void> {
    const result = await this.periodoLetivoModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Período letivo não encontrado.');
  }
}