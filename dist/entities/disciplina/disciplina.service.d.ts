import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
export declare class DisciplinaService {
    create(createDisciplinaDto: CreateDisciplinaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDisciplinaDto: UpdateDisciplinaDto): string;
    remove(id: number): string;
}
