import { LoteImportacaoService } from './lote-importacao.service';
export declare class LoteImportacaoController {
    private readonly loteService;
    constructor(loteService: LoteImportacaoService);
    obterLote(loteId: string, res: any): Promise<any>;
}
