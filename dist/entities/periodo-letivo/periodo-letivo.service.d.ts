import { Model, Connection } from 'mongoose';
import { PeriodoLetivo, PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
import { CreatePeriodoLetivoDto } from './dto/create-periodo-letivo.dto';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { CreatePeriodoLetivoBatchDto } from './dto/create-periodo-letivo-batch.dto';
export declare class PeriodoLetivoService {
    private periodoLetivoModel;
    private readonly connection;
    constructor(periodoLetivoModel: Model<PeriodoLetivoDocument>, connection: Connection);
    create(createPeriodoLetivoDto: CreatePeriodoLetivoDto): Promise<PeriodoLetivo>;
    bulkCreate(createPeriodosDto: CreatePeriodoLetivoDto[]): Promise<PeriodoLetivo[]>;
    bulkCreateWithTransaction(createPeriodosDto: CreatePeriodoLetivoDto[]): Promise<PeriodoLetivo[]>;
    createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<{
        batchId: string;
        periodosLetivos: any[];
    }>;
    updateInvalidPeriodos(id: string, updateDto: UpdatePeriodoLetivoDto): Promise<any>;
    findAll(): Promise<PeriodoLetivo[]>;
    findOne(id: string): Promise<PeriodoLetivo>;
    update(id: string, updatePeriodoLetivoDto: UpdatePeriodoLetivoDto): Promise<PeriodoLetivo>;
    remove(id: string): Promise<void>;
}
