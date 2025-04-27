import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Model, Connection } from 'mongoose';
import { Turma, TurmaDocument } from './schemas/turmas.schema';
export declare class TurmasService {
    private turmaModel;
    private readonly connection;
    constructor(turmaModel: Model<TurmaDocument>, connection: Connection);
    create(createTurmaDto: CreateTurmaDto): Promise<Turma>;
    findAll(): Promise<Turma[]>;
    findOne(id: string): Promise<Turma>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma>;
    remove(id: string): Promise<void>;
    bulkCreate(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]>;
    bulkCreateWithTransaction(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]>;
}
