import { TurmasService } from './turmas.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
export declare class TurmasController {
    private readonly turmasService;
    constructor(turmasService: TurmasService);
    create(createTurmaDto: CreateTurmaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTurmaDto: UpdateTurmaDto): string;
    remove(id: string): string;
}
