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

  async bulkCreate(createDisciplinasDto: CreateDisciplinaDto[]): Promise<Disciplina[]> {
    if (!Array.isArray(createDisciplinasDto) || createDisciplinasDto.length === 0) {
      throw new BadRequestException('Payload precisa ser uma lista de disciplinas.');
    }

    const erros: { index: number; error: string }[] = [];

     const disciplinasValidas = createDisciplinasDto.filter((disciplina, index) => {
      const problemas: string[] = [];
      if (typeof disciplina.codigoDisciplina !== 'string' || disciplina.codigoDisciplina.trim() === '') {
        problemas.push('Código da disciplina é obrigatório.');}
      if (!disciplina.dataInicial || isNaN(Date.parse(disciplina.dataInicial.toString()))) problemas.push('Data inicial inválida.');
      if (!disciplina.dataFinal || isNaN(Date.parse(disciplina.dataFinal.toString()))) problemas.push('Data final inválida.');
      if (!disciplina.categoria) problemas.push('Categoria é obrigatória.');

      if (problemas.length > 0) {
        erros.push({ index, error: problemas.join(' | ') });
        return false; // Remove a disciplina da lista se houver erros
      }
      return true; // Mantém a disciplina na lista se não houver erros
    });

    if (erros.length > 0) {
      throw new BadRequestException({
        message: 'Erros de validação nas disciplinas.',
        erros,
      });
    }

    if (disciplinasValidas.length === 0) {
          throw new BadRequestException({
            message: 'Nenhuma disciplina válida foi enviada.',
            erros,
          });
        }
    
        if (erros.length > 0) {
          throw new BadRequestException({
            message: 'Algumas disciplinas foram rejeitadas.',
            erros,
          });
        }

        const disciplinasSanitizadas = disciplinasValidas.map(d => ({
          ...d,
          codigoDisciplina: d.codigoDisciplina.trim(),
        }));
        try {
        const insertedDisciplinas = await this.disciplinaModel.insertMany(disciplinasSanitizadas);
        return insertedDisciplinas.map(d => d.toObject() as Disciplina);
  } catch (error) {
    console.error('Erro ao inserir disciplinas em lote:', error);
    throw new InternalServerErrorException('Erro ao salvar disciplinas.');
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
