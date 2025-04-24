import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoController {
    private readonly periodoLetivoService;
    constructor(periodoLetivoService: PeriodoLetivoService);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): string;
    remove(id: string): string;
}
