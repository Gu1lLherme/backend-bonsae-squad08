import { Model } from 'mongoose';
import { ProcessoImportacao, ProcessoImportacaoDocument, EtapaImportacao, StatusImportacao } from './schemas/processo-importacao.schema';
export declare class ProcessoImportacaoService {
    private readonly processoModel;
    constructor(processoModel: Model<ProcessoImportacaoDocument>);
    createProcesso(iniciadoPor?: string): Promise<{
        processId: string;
    }>;
    updateProcesso(processId: string, etapa?: EtapaImportacao, status?: StatusImportacao, totalRegistros?: number, erros?: string[]): Promise<ProcessoImportacao>;
    getProcessoById(processId: any): Promise<ProcessoImportacao>;
    marcarEtapaConcluida(processId: any, etapa: string): Promise<void>;
}
