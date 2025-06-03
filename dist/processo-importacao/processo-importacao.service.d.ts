import { Model } from 'mongoose';
import { ProcessoImportacao, ProcessoImportacaoDocument, EtapaImportacao, StatusImportacao } from './schemas/processo-importacao.schema';
import { CreateProcessoImportacaoDto } from 'src/processo-importacao/dto/processo-importacao.dto';
export declare class ProcessoImportacaoService {
    private readonly processoModel;
    constructor(processoModel: Model<ProcessoImportacaoDocument>);
    createProcesso(dto: CreateProcessoImportacaoDto): Promise<{
        processId: any;
    }>;
    updateProcesso(processId: string, etapa?: EtapaImportacao, status?: StatusImportacao, totalRegistros?: number, erros?: string[]): Promise<ProcessoImportacao>;
    getProcessoById(processId: string): Promise<ProcessoImportacao>;
    marcarEtapaConcluida(processId: any, etapa: string): Promise<import("mongoose").Document<unknown, {}, ProcessoImportacaoDocument> & ProcessoImportacao & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
