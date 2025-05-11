import { Model } from 'mongoose';
import { LoteImportacao, LoteImportacaoDocument } from './schemas/lote-importacao.schema';
export declare class LoteImportacaoService {
    private readonly loteModel;
    constructor(loteModel: Model<LoteImportacaoDocument>);
    criarLote(data: Partial<LoteImportacao>): Promise<import("mongoose").Document<unknown, {}, LoteImportacaoDocument> & LoteImportacao & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    atualizarErros(loteId: string, erros: LoteImportacao['erros']): Promise<import("mongoose").UpdateWriteOpResult>;
    finalizarLoteComSucesso(loteId: string, total: number): Promise<import("mongoose").UpdateWriteOpResult>;
    buscarPorLoteId(loteId: string): Promise<(import("mongoose").Document<unknown, {}, LoteImportacaoDocument> & LoteImportacao & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
