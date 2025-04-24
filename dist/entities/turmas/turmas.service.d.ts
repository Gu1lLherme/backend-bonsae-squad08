import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
export declare class TurmasService {
    create(createTurmaDto: CreateTurmaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTurmaDto: UpdateTurmaDto): string;
    remove(id: number): string;
}
