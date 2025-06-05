import { Model } from 'mongoose';
import { PeriodoLetivoDocument } from './schemas/periodo-letivo.schema';
import { UpdatePeriodoLetivoDto } from './dto/update-periodo-letivo.dto';
import { CreatePeriodoLetivoBatchDto } from './dto/create-periodo-letivo-batch.dto';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
import 'src/processo-importacao/schemas/processo-importacao.schema';
export declare class PeriodoLetivoService {
    private periodoLetivoModel;
    private readonly processoImportacaoService;
    constructor(periodoLetivoModel: Model<PeriodoLetivoDocument>, processoImportacaoService: ProcessoImportacaoService);
    createBatch(dto: CreatePeriodoLetivoBatchDto): Promise<any>;
    updateInvalidPeriodos(id: string, updateDto: UpdatePeriodoLetivoDto): Promise<any>;
}
