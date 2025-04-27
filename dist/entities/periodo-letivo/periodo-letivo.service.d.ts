import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { Model } from 'mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
export declare class PeriodoLetivoService {
    private PeridoLetivoModel;
    constructor(PeridoLetivoModel: Model<PeriodoLetivoDocument>);
    create(dto: CreatePeriodoLetivoDto): Promise<import("mongoose").Document<unknown, {}, PeriodoLetivoDocument, {}> & PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, PeriodoLetivoDocument, {}> & PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, PeriodoLetivoDocument, {}> & PeriodoLetivo & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: number, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<string>;
    remove(id: number): string;
}
