import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { CreateTurmaBatchDto } from './dto/create-turma-batch.dto';
import { Turma } from './schemas/turmas.schema';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
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
    createBatch(dto: CreateTurmaBatchDto): Promise<{
        batchId: string;
        turmas: import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("./schemas/turmas.schema").TurmaDocument> & Turma & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }, Omit<{
            batchId: string;
            valid: boolean;
            validationErrors: string[];
            codigoDisciplina: string;
            turno: "Manh\u00E3" | "Tarde" | "Noite";
            codigoTurma: string;
            nomeTurma: string;
            tipo: "aluno" | "professor";
            usuarios?: string[];
        }, "_id">>[];
    }>;
}
