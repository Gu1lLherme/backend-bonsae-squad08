import { DisciplinaService } from './disciplina.service';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';
export declare class DisciplinaController {
    private readonly disciplinaService;
    constructor(disciplinaService: DisciplinaService);
    createBatch(dto: CreateDisciplinaBatchDto): Promise<{
        batchId: string;
        disciplinas: any[];
    }>;
    revalidarTurma(id: string, updateDto: UpdateDisciplinaDto): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: string): string;
}
