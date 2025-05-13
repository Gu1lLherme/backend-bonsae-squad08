import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Model, Connection } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schemas/disciplina.schema';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';
export declare class DisciplinaService {
    private readonly disciplinaModel;
    private readonly connection;
    constructor(disciplinaModel: Model<DisciplinaDocument>, connection: Connection);
    create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: number): string;
    createBatch(dto: CreateDisciplinaBatchDto): Promise<{
        batchId: string;
        disciplinas: any[];
    }>;
    updateInvalidDisciplinas(id: string, updateDto: UpdateDisciplinaDto): Promise<any>;
}
