import { Model } from 'mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
export declare class PeriodoLetivoService {
    private readonly periodoLetivoModel;
    constructor(periodoLetivoModel: Model<PeriodoLetivoDocument>);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): Promise<PeriodoLetivo>;
    findAll(): Promise<PeriodoLetivo[]>;
    findOne(id: string): Promise<PeriodoLetivo>;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<PeriodoLetivo>;
    remove(id: string): Promise<void>;
}
