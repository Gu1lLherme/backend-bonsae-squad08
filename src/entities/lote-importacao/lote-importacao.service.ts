import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LoteImportacao,
  LoteImportacaoDocument,
} from './schemas/lote-importacao.schema';

@Injectable()
export class LoteImportacaoService {
  constructor(
    @InjectModel(LoteImportacao.name)
    private readonly loteModel: Model<LoteImportacaoDocument>,
  ) {}

  async criarLote(data: Partial<LoteImportacao>) {
    const lote = new this.loteModel(data);
    return lote.save();
  }

  async atualizarErros(loteId: string, erros: LoteImportacao['erros']) {
    return this.loteModel.updateOne(
      { loteId },
      {
        $set: {
          erros,
          status: 'com_erro',
          quantidade_sucesso: 0,
        },
      },
    );
  }

  async finalizarLoteComSucesso(loteId: string, total: number) {
    return this.loteModel.updateOne(
      { loteId },
      {
        $set: {
          status: 'importado',
          quantidade_sucesso: total,
        },
      },
    );
  }

  async buscarPorLoteId(loteId: string) {
    return this.loteModel.findOne({ loteId });
  }
}