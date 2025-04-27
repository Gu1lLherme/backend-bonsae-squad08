import { DisciplinaService } from './disciplina.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
export declare class DisciplinaController {
    private readonly disciplinaService;
    constructor(disciplinaService: DisciplinaService);
    create(createDisciplinaDto: CreateDisciplinaDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/disciplina.schema").DisciplinaDocument> & import("./schemas/disciplina.schema").Disciplina & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: string): string;
}
