import { PeriodoLetivoService } from './periodo-letivo.service';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoController {
    private readonly periodoLetivoService;
    constructor(periodoLetivoService: PeriodoLetivoService);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/periodo-letivo.schema").PeriodoLetivoDocument, {}> & import("./schemas/periodo-letivo.schema").PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/periodo-letivo.schema").PeriodoLetivoDocument, {}> & import("./schemas/periodo-letivo.schema").PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/periodo-letivo.schema").PeriodoLetivoDocument, {}> & import("./schemas/periodo-letivo.schema").PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<string>;
    remove(id: string): string;
}
