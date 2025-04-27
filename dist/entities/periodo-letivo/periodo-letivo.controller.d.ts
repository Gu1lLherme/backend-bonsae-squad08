import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoController {
    private readonly periodoLetivoService;
    constructor(periodoLetivoService: PeriodoLetivoService);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): Promise<{
        message: string;
        data: import("./schemas/periodo-letivo.schema").PeriodoLetivo;
    }>;
    bulkCreate(createPeriodoLetivoDto: CreatePeriodoLetivoDto[]): Promise<{
        message: string;
        data: import("./schemas/periodo-letivo.schema").PeriodoLetivo[];
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./schemas/periodo-letivo.schema").PeriodoLetivo[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./schemas/periodo-letivo.schema").PeriodoLetivo;
    }>;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<{
        message: string;
        data: import("./schemas/periodo-letivo.schema").PeriodoLetivo;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
