import { Document } from "mongoose";
export type ProcessoImportacaoDocument = ProcessoImportacao & Document;
export declare class ProcessoImportacao {
    tipo: 'Periodo-Letivo' | 'Disciplina' | 'Turmas' | 'Usuario';
    status: 'criado' | 'arquivo-enviado' | 'validando' | 'concluido';
    usuario?: string;
    nomeArquivo?: string;
    totalRegistros?: number;
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
