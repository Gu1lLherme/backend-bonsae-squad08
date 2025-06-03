import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
} from '@nestjs/common';

import {
  ProcessoImportacaoService,
} from './processo-importacao.service';
import {
  EtapaImportacao,
  StatusImportacao,
} from './schemas/processo-importacao.schema';

@Controller('processo-importacao')
export class ProcessoImportacaoController {
  constructor(
    private readonly processoService: ProcessoImportacaoService,
  ) {}

  /**
   * POST /processo-importacao/iniciar
   * Cria um novo processo e retorna { processId }.
   */
  @Post('iniciar')
  async iniciar(): Promise<{ processId: string }> {
    // Você pode extrair `iniciadoPor` via req.user, se estiver usando auth guard
    const iniciadoPor = 'anônimo'; // ou req.user.id
    return this.processoService.createProcesso(iniciadoPor);
  }

  /**
   * GET /processo-importacao/:id
   * Retorna os detalhes do processo (etapa, status, totalRegistros, erros, timestamps).
   */
  @Get(':processId')
  async getProcesso(@Param('processId') processId: string) {
    return this.processoService.getProcessoById(processId);
  }

  /**
   * PATCH /processo-importacao/:id
   * Atualiza etapa/status/totalRegistros/erros do processo.
   *
   * Body possível:
   * {
   *   etapa: 'DISCIPLINAS',
   *   status: 'EM_ANDAMENTO',
   *   totalRegistros: 100,
   *   erros: ['erro1', 'erro2']
   * }
   */
  @Patch(':processId')
  async updateProcesso(
    @Param('processId') processId: string,
    @Body()
    body: {
      etapa?: EtapaImportacao;
      status?: StatusImportacao;
      totalRegistros?: number;
      erros?: string[];
    },
  ) {
    return this.processoService.updateProcesso(
      processId,
      body.etapa,
      body.status,
      body.totalRegistros,
      body.erros,
    );
  }
}
