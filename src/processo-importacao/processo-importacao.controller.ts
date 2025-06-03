import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProcessoImportacaoService } from './processo-importacao.service';
import {
  EtapaImportacao,
  StatusImportacao,
  ProcessoImportacao,
} from './schemas/processo-importacao.schema';
import { CreateProcessoImportacaoDto } from './dto/processo-importacao.dto';
import { UpdateProcessoImportacaoDto } from './dto/update-processo-importacao.dto';

@Controller('processo-importacao')
export class ProcessoImportacaoController {
  constructor(
    private readonly processoService: ProcessoImportacaoService,
  ) {}

  @Post()
  async create(@Body() dto: CreateProcessoImportacaoDto): Promise<{ processId: string }> {
    return await this.processoService.createProcesso(dto);
  }

  @Patch('status')
  async updateStatus(@Body() dto: UpdateProcessoImportacaoDto): Promise<ProcessoImportacao> {
    const { processId, etapaAtual, status, totalRegistros, erros } = dto;

    if (!processId) {
      throw new NotFoundException('processId é obrigatório');
    }

    return await this.processoService.updateProcesso(
      processId,
      etapaAtual,
      status,
      totalRegistros,
      erros,
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProcessoImportacao> {
    return await this.processoService.getProcessoById(id);
  }
}
