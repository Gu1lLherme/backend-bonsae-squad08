import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ProcessoImportacao,
  ProcessoImportacaoDocument,
  EtapaImportacao,
  StatusImportacao,
} from './schemas/processo-importacao.schema';

@Injectable()
export class ProcessoImportacaoService {
  constructor(
    @InjectModel(ProcessoImportacao.name)
    private readonly processoModel: Model<ProcessoImportacaoDocument>,
  ) {}

  /**
   * Cria um novo processo de importação e retorna o processId.
   * A etapa inicial do processo será EtapaImportacao.PERIODOS.
   */
  async createProcesso(iniciadoPor: string = 'anônimo'): Promise<{ processId: string }> {
    const processo = await this.processoModel.create({ iniciadoPor });
    return { processId: processo.processId };
  }

  /**
   * Atualiza a etapa e/ou o status do processo, além de opcionalmente
   * ajustar totalRegistros ou registrar mensagens de erro.
   */
  async updateProcesso(
    processId: string,
    etapa?: EtapaImportacao,
    status?: StatusImportacao,
    totalRegistros?: number,
    erros?: string[],
  ): Promise<ProcessoImportacao> {
    const update: Partial<ProcessoImportacao> = {};
    if (etapa) update.etapaAtual = etapa;
    if (status) update.status = status;
    if (typeof totalRegistros === 'number') update.totalRegistros = totalRegistros;
    if (erros) update.erros = erros;

    const processo = await this.processoModel.findOneAndUpdate(
      { processId },
      update,
      { new: true },
    );
    if (!processo) throw new NotFoundException(`Processo ${processId} não encontrado.`);
    return processo;
  }

  /**
   * Retorna os dados do processo (etapa atual, status, totalRegistros, erros, timestamps).
   */
  async getProcessoById(processId): Promise<ProcessoImportacao> {
    const processo = await this.processoModel.findOne({ processId });
    if (!processo) throw new NotFoundException(`Processo ${processId} não encontrado.`);
    return processo;
  }
}
