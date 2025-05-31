import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { CreateTurmaBatchDto } from './dto/create-turma-batch.dto';
import { Turma } from './schemas/turmas.schema';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
    createBatch(dto: CreateTurmaBatchDto): Promise<{
        batchId: string;
        turmas: any[];
    }>;
    revalidarTurma(id: string, updateDto: UpdateTurmaDto): Promise<any>;
    create(createTurmaDto: CreateTurmaDto): Promise<{
        message: string;
        data: Turma;
    }>;
    findAll(): Promise<{
        message: string;
        data: Turma[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: Turma;
    }>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<{
        message: string;
        data: Turma;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
