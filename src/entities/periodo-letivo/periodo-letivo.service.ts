import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';

@Injectable()
export class PeriodoLetivoService {
  constructor(
    @InjectModel(PeriodoLetivo.name) private readonly periodoLetivoModel: Model<PeriodoLetivoDocument>,
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