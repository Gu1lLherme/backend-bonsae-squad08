import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoService {
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): string;
    remove(id: number): string;
}
