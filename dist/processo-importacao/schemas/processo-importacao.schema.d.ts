import { Document } from 'mongoose';
export type ProcessoImportacaoDocument = ProcessoImportacao & Document;
export declare enum EtapaImportacao {
    PERIODOS = "PERIODOS",
    DISCIPLINAS = "DISCIPLINAS",
    TURMAS = "TURMAS",
    USUARIOS = "USUARIOS",
    FINALIZADO = "FINALIZADO"
}
export declare enum StatusImportacao {
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDO = "CONCLUIDO",
    ERRO = "ERRO"
}
export declare class ProcessoImportacao {
    processId: string;
    etapaAtual: EtapaImportacao;
    status: StatusImportacao;
    iniciadoPor: string;
    erros: string[];
    totalRegistros: number;
}
export declare const ProcessoImportacaoSchema: import("mongoose").Schema<ProcessoImportacao, import("mongoose").Model<ProcessoImportacao, any, any, any, Document<unknown, any, ProcessoImportacao> & ProcessoImportacao & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProcessoImportacao, Document<unknown, {}, import("mongoose").FlatRecord<ProcessoImportacao>> & import("mongoose").FlatRecord<ProcessoImportacao> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
