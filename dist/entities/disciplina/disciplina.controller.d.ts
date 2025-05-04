import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
export declare class DisciplinaController {
    private readonly disciplinaService;
    constructor(disciplinaService: DisciplinaService);
    create(createDisciplinaDto: CreateDisciplinaDto): Promise<{
        message: string;
        data: import("./schemas/disciplina.schema").Disciplina;
    }>;
    bulkCreate(createDisciplinasDto: CreateDisciplinaDto[]): Promise<{
        message: string;
        data: import("./schemas/disciplina.schema").Disciplina[];
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: string): string;
}
