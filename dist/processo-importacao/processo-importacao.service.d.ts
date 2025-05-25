import { Model } from "mongoose";
import { ProcessoImportacao, ProcessoImportacaoDocument } from "./schemas/processo-importacao.schema";
export declare class ProcessoImportacaoService {
    private readonly processoImportacaoModel;
    constructor(processoImportacaoModel: Model<ProcessoImportacaoDocument>);
    createProcesso(tipo: string, usuario: string): Promise<ProcessoImportacao>;
    updateStatus(id: string, status: ProcessoImportacao['status'], extra?: Partial<ProcessoImportacao>): Promise<ProcessoImportacao>;
    buscarPorId(id: string): Promise<ProcessoImportacao>;
}
