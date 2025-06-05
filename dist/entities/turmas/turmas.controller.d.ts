import { TurmasService } from './turmas.service';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { CreateTurmaBatchDto } from './dto/create-turma-batch.dto';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
    createBatch(dto: CreateTurmaBatchDto): Promise<any>;
    revalidarTurma(id: string, updateDto: UpdateTurmaDto): Promise<any>;
}
