import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
    create(createTurmaDto: CreateTurmaDto): Promise<{
        message: string;
        data: import("./schemas/turmas.schema").Turma;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./schemas/turmas.schema").Turma[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./schemas/turmas.schema").Turma;
    }>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<{
        message: string;
        data: import("./schemas/turmas.schema").Turma;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
