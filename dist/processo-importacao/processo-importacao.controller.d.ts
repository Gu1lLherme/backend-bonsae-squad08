import { ProcessoImportacaoService } from './processo-importacao.service';
import { ProcessoImportacao } from './schemas/processo-importacao.schema';
import { CreateProcessoImportacaoDto } from 'src/processo-importacao/dto/processo-importacao.dto';
import { UpdateProcessoImportacaoDto } from './dto/update-processo-importacao.dto';
export declare class ProcessoImportacaoController {
    private readonly processoService;
    constructor(processoService: ProcessoImportacaoService);
    create(dto: CreateProcessoImportacaoDto): Promise<{
        processId: string;
    }>;
    updateStatus(dto: UpdateProcessoImportacaoDto): Promise<ProcessoImportacao>;
    findById(id: string): Promise<ProcessoImportacao>;
}
