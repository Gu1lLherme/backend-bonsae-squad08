import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Turma, TurmaDocument, TurmaSchema } from './schemas/turmas.schema';

@Injectable()
export class TurmasService {
  constructor(@InjectModel(Turma.name) private turmaModel: Model<TurmaDocument>, @InjectConnection() private readonly connection: Connection,) {}


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
// Método para criar turmas em lote com transação
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
    }
  }
}