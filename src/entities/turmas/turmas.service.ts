import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Turma, TurmaDocument, TurmaSchema } from './schemas/turmas.schema';

@Injectable()
export class TurmasService {
  constructor(@InjectModel(Turma.name) private turmaModel: Model<TurmaDocument>) {}


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

  async bulkCreate(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]> {
    const createdTurmas = await this.turmaModel.insertMany(createTurmasDto);
    return createdTurmas.map(turma => turma.toObject() as Turma);
}

}