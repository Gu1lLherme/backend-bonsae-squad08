
import { Controller, Post, Body, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { ProcessoImportacaoService } from "./processo-importacao.service";
import { v4 as uuidv4 } from 'uuid';
import { PeriodoLetivoService } from "../entities/periodo-letivo/periodo-letivo.service";
import { ImportPeriodoLetivoDto } from "../entities/periodo-letivo/dto/import-periodo-letivo.dto";


@Controller('processo-importacao')

export class ProcessoImportacaoController {
  constructor(private readonly processoImportacaoService: ProcessoImportacaoService, 
    private readonly periodoLetivoService: PeriodoLetivoService) {}

@UsePipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}))
@Post('iniciar')
async iniciarProcessoImportacao(
  @Body() dto: ImportPeriodoLetivoDto,
  @Req () req: any,
) {	
    const { processId, periodos } = dto;

    await this.periodoLetivoService.createBatch({ processId, periodos: Array.isArray(periodos) ? periodos : [periodos] });

    await this.processoImportacaoService.createProcesso(
        processId,
        'periodo-letivo', 
        
    );
    return {
        message: 'Processo de importação iniciado com sucesso!',
        processId,
    };
}
}