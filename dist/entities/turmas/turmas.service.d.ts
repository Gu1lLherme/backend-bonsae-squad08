import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { CreateTurmaBatchDto } from './dto/create-turma-batch.dto';
import { Model } from 'mongoose';
import { Turma, TurmaDocument } from './schemas/turmas.schema';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
export declare class TurmasService {
    private turmaModel;
    private readonly processoImportacaoService;
    constructor(turmaModel: Model<TurmaDocument>, processoImportacaoService: ProcessoImportacaoService);
    create(createTurmaDto: CreateTurmaDto): Promise<Turma>;
    findAll(): Promise<Turma[]>;
    findOne(id: string): Promise<Turma>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<Turma>;
    remove(id: string): Promise<void>;
    bulkCreate(createTurmasDto: CreateTurmaDto[]): Promise<Turma[]>;
    createBatch(dto: CreateTurmaBatchDto): Promise<any>;
    updateInvalidTurmas(id: string, updateDto: UpdateTurmaDto): Promise<any>;
}
