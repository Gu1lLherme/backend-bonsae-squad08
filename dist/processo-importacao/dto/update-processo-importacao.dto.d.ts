import { EtapaImportacao, StatusImportacao } from '../schemas/processo-importacao.schema';
export declare enum ProcessoStatus {
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDO = "CONCLUIDO",
    ERRO = "ERRO"
}
export declare class UpdateProcessoImportacaoDto {
    processId: string;
    etapaAtual?: EtapaImportacao;
    status?: StatusImportacao;
    totalRegistros?: number;
    erros?: string[];
}
