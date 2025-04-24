import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';

@Injectable()
export class PeriodoLetivoService {

  constructor(
    @InjectModel(PeriodoLetivo.name)
    private PeridoLetivoModel: Model<PeriodoLetivoDocument>
  ){}

  async create(dto: CreatePeriodoLetivoDto) {
    const peridoLetivo = new this.PeridoLetivoModel(dto);
    return peridoLetivo.save();
  }

  async findAll() {
    return this.PeridoLetivoModel.find().exec();
  }

  async findOne(id: string) {
    const periodoLetivo = await this.PeridoLetivoModel.findById(id)
    if (!periodoLetivo) throw new NotFoundException('Usuário não encontrado');
    return periodoLetivo;
  }

  async update(id: number, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto) {
    const peri
    return `This action updates a #${id} periodoLetivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} periodoLetivo`;
  }
}
