import { CreatePastaDto } from './dto/create-pasta.dto';
import { UpdatePastaDto } from './dto/update-pasta.dto';
export declare class PastaService {
    create(createPastaDto: CreatePastaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePastaDto: UpdatePastaDto): string;
    remove(id: number): string;
}
