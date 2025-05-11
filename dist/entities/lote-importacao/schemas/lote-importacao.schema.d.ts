import { Document } from 'mongoose';
export type LoteImportacaoDocument = LoteImportacao & Document;
export declare class LoteImportacao {
    loteId: string;
    tipo: 'turmas' | 'periodo_letivo' | 'disciplina' | 'usuario';
    nomeArquivo: string;
    status: string;
    erros?: Array<{
        index: number;
        mensagens: string[];
        item: any;
    }>;
    quantidade_total?: number;
    quantidade_sucesso?: number;
    dataEnvio: Date;
}
export declare const LoteImportacaoSchema: import("mongoose").Schema<LoteImportacao, import("mongoose").Model<LoteImportacao, any, any, any, Document<unknown, any, LoteImportacao> & LoteImportacao & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LoteImportacao, Document<unknown, {}, import("mongoose").FlatRecord<LoteImportacao>> & import("mongoose").FlatRecord<LoteImportacao> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
