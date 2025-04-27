import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Model, Connection } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schemas/disciplina.schema';
export declare class DisciplinaService {
    private readonly disciplinaModel;
    private readonly connection;
    constructor(disciplinaModel: Model<DisciplinaDocument>, connection: Connection);
    create(createDisciplinaDto: CreateDisciplinaDto): Promise<import("mongoose").Document<unknown, {}, DisciplinaDocument> & Disciplina & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    bulkCreate(createDisciplinasDto: CreateDisciplinaDto[]): Promise<Disciplina[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: number): string;
}
