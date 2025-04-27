import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoController {
    private readonly periodoLetivoService;
    constructor(periodoLetivoService: PeriodoLetivoService);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): any;
    remove(id: string): any;
}
