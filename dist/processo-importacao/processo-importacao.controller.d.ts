import { ProcessoImportacaoService } from './processo-importacao.service';
import { EtapaImportacao, StatusImportacao } from './schemas/processo-importacao.schema';
export declare class ProcessoImportacaoController {
    private readonly processoService;
    constructor(processoService: ProcessoImportacaoService);
    iniciar(): Promise<{
        processId: string;
    }>;
    getProcesso(processId: string): Promise<import("./schemas/processo-importacao.schema").ProcessoImportacao>;
    updateProcesso(processId: string, body: {
        etapa?: EtapaImportacao;
        status?: StatusImportacao;
        totalRegistros?: number;
        erros?: string[];
    }): Promise<import("./schemas/processo-importacao.schema").ProcessoImportacao>;
}
