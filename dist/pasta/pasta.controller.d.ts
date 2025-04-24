import { PastaService } from './pasta.service';
import { CreatePastaDto } from './dto/create-pasta.dto';
import { UpdatePastaDto } from './dto/update-pasta.dto';
export declare class PastaController {
    private readonly pastaService;
    constructor(pastaService: PastaService);
    create(createPastaDto: CreatePastaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePastaDto: UpdatePastaDto): string;
    remove(id: string): string;
}
