import { CreatePeriodoLetivoDto } from "../periodo-letivo/dto/create-periodo-letivo.dto";
import { Controller, Post, Body, UsePipes, ValidationPipe, Req } from "@nestjs/common";
import { ProcessoImportacaoService } from "./processo-importacao.service";
import { v4 as uuidv4 } from 'uuid';
import { PeriodoLetivoService } from "../periodo-letivo/periodo-letivo.service";
import { ImportPeriodoLetivoDto } from "../periodo-letivo/dto/import-periodo-letivo.dto";


@Controller('processo-importacao')

export class ProcessoImportacaoController {
  constructor(private readonly processoImportacaoService: ProcessoImportacaoService, private readonly periodoLetivoService: PeriodoLetivoService) {}

@Post('iniciar')
async iniciarProcessoImportacao(
  @Body() dto: ImportPeriodoLetivoDto,
  @Req () req: any,
) {	
    const { processId, periodoLetivo } = dto;

    await this.periodoLetivoService.create({periodoLetivo});

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