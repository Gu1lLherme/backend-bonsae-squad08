import { PeriodoLetivoService } from './periodo-letivo.service';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { CreatePeriodoLetivoBatchDto } from './dto/create-periodo-letivo-batch.dto';
export declare class PeriodoLetivoController {
    private readonly periodoLetivoService;
    constructor(periodoLetivoService: PeriodoLetivoService);
    createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<any>;
    revalidarPeriodo(id: string, updateDto: UpdatePeriodoLetivoDto): Promise<any>;
}
