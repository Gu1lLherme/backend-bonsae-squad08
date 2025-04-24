import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
export declare class AssistidosService {
    create(createAssistidoDto: CreateAssistidoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAssistidoDto: UpdateAssistidoDto): string;
    remove(id: number): string;
}
