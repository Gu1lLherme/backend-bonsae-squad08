import { ProcessoImportacaoService } from "./processo-importacao.service";
import { PeriodoLetivoService } from "../periodo-letivo/periodo-letivo.service";
import { ImportPeriodoLetivoDto } from "../periodo-letivo/dto/import-periodo-letivo.dto";
export declare class ProcessoImportacaoController {
    private readonly processoImportacaoService;
    private readonly periodoLetivoService;
    constructor(processoImportacaoService: ProcessoImportacaoService, periodoLetivoService: PeriodoLetivoService);
    iniciarProcessoImportacao(dto: ImportPeriodoLetivoDto, req: any): Promise<{
        message: string;
        processId: string;
    }>;
}
