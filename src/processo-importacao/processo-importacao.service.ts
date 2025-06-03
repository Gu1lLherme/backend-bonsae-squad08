// processo-importacao.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProcessoImportacao,
  ProcessoImportacaoDocument,
  EtapaImportacao,
  StatusImportacao,
} from './schemas/processo-importacao.schema';
import { CreateProcessoImportacaoDto } from 'src/processo-importacao/dto/processo-importacao.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProcessoImportacaoService {
  constructor(
    @InjectModel(ProcessoImportacao.name)
    private readonly processoModel: Model<ProcessoImportacaoDocument>,
  ) {}

  async createProcesso(dto: CreateProcessoImportacaoDto): Promise<{ processId}> {
    const processo = new this.processoModel({
      ...dto,
      processId: uuidv4(),
      status: StatusImportacao.EM_ANDAMENTO,
      erros: [],
      etapasConcluidas: [],
    });

    await processo.save();
    return { processId: processo.processId };
  }

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

    if (!processo) {
      throw new NotFoundException(`Processo ${processId} não encontrado.`);
    }

    return processo;
  }

  async getProcessoById(processId: string): Promise<ProcessoImportacao> {
    const processo = await this.processoModel.findOne({ processId });
    if (!processo) throw new NotFoundException(`Processo ${processId} não encontrado.`);
    return processo;
  }

  async marcarEtapaConcluida(processId, etapa: string) {
    const processo = await this.processoModel.findOneAndUpdate(
      { processId },
      { $addToSet: { etapasConcluidas: etapa } },
      { new: true },
    );
    if (!processo) throw new NotFoundException(`Processo ${processId} não encontrado.`);
    return processo;
  }
}
