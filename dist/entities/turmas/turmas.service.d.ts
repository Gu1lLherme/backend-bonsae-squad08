import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Model } from 'mongoose';
import { Turma, TurmaDocument } from './schemas/turmas.schema';
export declare class TurmasService {
    private turmaModel;
    constructor(turmaModel: Model<TurmaDocument>);
    create(createTurmaDto: CreateTurmaDto): Promise<Turma>;
    findAll(): Promise<Turma[]>;
    findOne(id: string): Promise<Turma>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma>;
    remove(id: string): Promise<void>;
}
