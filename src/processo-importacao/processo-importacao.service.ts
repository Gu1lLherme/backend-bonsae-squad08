import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ProcessoImportacao,
  ProcessoImportacaoDocument,
  EtapaImportacao,
  StatusImportacao,
} from './schemas/processo-importacao.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcessoImportacaoDto } from './dto/processo-importacao.dto';

@Injectable()
export class ProcessoImportacaoService {
  constructor(
    @InjectRepository(ProcessoImportacao)
    private readonly processoRepo: Repository<ProcessoImportacao>,
  ) {}

  
  async createProcesso(dto: CreateProcessoImportacaoDto): Promise<{ProcessoImportacao}> {
    const processo = this.processoRepo.create({
        ...dto,
        status: StatusImportacao.EM_ANDAMENTO,
    });
    return await this.processoRepo.save(processo);
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
  async findById(processId: string): Promise<ProcessoImportacao> {
const processo = await this.processoRepo.findOneBy({ processId });
if (!processo) throw new NotFoundException(`Processo ${processId} não encontrado.`);
return processo;
}

  async marcarEtapaConcluida(processId, etapa: string) {
await this.processoModel.updateOne(
{ _id: processId },
{ $addToSet: { etapasConcluidas: etapa } }
);
}
}
