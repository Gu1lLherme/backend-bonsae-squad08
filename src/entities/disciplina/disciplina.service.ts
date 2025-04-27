import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schemas/disciplina.schema';

@Injectable()
export class DisciplinaService {
  constructor(
    @InjectModel(Disciplina.name) private readonly disciplinaModel: Model<DisciplinaDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  create(createDisciplinaDto: CreateDisciplinaDto) {
    const problemas: string[] = [];
    if (!createDisciplinaDto.codigoDisciplina) problemas.push('Código da disciplina é obrigatório.');
    if (!createDisciplinaDto.dataInicial || isNaN(Date.parse(createDisciplinaDto.dataInicial.toString()))) problemas.push('Data inicial inválida.');
    if (!createDisciplinaDto.dataFinal || isNaN(Date.parse(createDisciplinaDto.dataFinal.toString()))) problemas.push('Data final inválida.');
    if (!createDisciplinaDto.categoria) problemas.push('Categoria é obrigatória.');

    if (problemas.length > 0) {
      throw new BadRequestException(problemas.join(' | '));
    }

    return this.disciplinaModel.create(createDisciplinaDto);
  }

  async bulkCreate(createDisciplinasDto: CreateDisciplinaDto[]): Promise<Disciplina[]> {
    if (!Array.isArray(createDisciplinasDto) || createDisciplinasDto.length === 0) {
      throw new BadRequestException('Payload precisa ser uma lista de disciplinas.');
    }

    const erros: { index: number; error: string }[] = [];

    createDisciplinasDto.forEach((disciplina, index) => {
      const problemas: string[] = [];
      if (!disciplina.codigoDisciplina) problemas.push('Código da disciplina é obrigatório.');
      if (!disciplina.dataInicial || isNaN(Date.parse(disciplina.dataInicial.toString()))) problemas.push('Data inicial inválida.');
      if (!disciplina.dataFinal || isNaN(Date.parse(disciplina.dataFinal.toString()))) problemas.push('Data final inválida.');
      if (!disciplina.categoria) problemas.push('Categoria é obrigatória.');

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
      }
    });

    if (erros.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação nas disciplinas.',
        erros,
      });
    }

    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const disciplinasCriadas = await this.disciplinaModel.insertMany(createDisciplinasDto, { session });
      await session.commitTransaction();
      session.endSession();
      return disciplinasCriadas;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Erro no bulkCreate de Disciplinas:', error);
      throw new InternalServerErrorException('Erro ao criar disciplinas em lote.');
    }
  }

  findAll() {
    return `This action returns all disciplina`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disciplina`;
  }

  update(id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    return `This action updates a #${id} disciplina`;
  }

  remove(id: number) {
    return `This action removes a #${id} disciplina`;
  }
}
