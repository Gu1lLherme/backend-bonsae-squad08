import { AssistidosService } from './assistidos.service';
import { CreateAssistidoDto } from './dto/create-assistido.dto';
import { UpdateAssistidoDto } from './dto/update-assistido.dto';
export declare class AssistidosController {
    private readonly assistidosService;
    constructor(assistidosService: AssistidosService);
    create(createAssistidoDto: CreateAssistidoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAssistidoDto: UpdateAssistidoDto): string;
    remove(id: string): string;
}
