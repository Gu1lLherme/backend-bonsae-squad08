import { DisciplinaService } from './disciplina.service';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';
export declare class DisciplinaController {
    private readonly disciplinaService;
    constructor(disciplinaService: DisciplinaService);
    createBatch(dto: CreateDisciplinaBatchDto): Promise<any>;
    revalidarTurma(id: string, updateDto: UpdateDisciplinaDto): Promise<any>;
}
