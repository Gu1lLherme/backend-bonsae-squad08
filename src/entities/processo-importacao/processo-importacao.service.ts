import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { In } from "typeorm";
import { ProcessoImportacao, ProcessoImportacaoDocument } from "./schemas/processo-importacao.schema";


@Injectable()
export class ProcessoImportacaoService {
    constructor(
        @InjectModel(ProcessoImportacao.name) private readonly processoImportacaoModel: Model<ProcessoImportacaoDocument>,
    ) {}
    
    async createProcesso(tipo: string, usuario: string): Promise<ProcessoImportacao> {
        const processo = new this.processoImportacaoModel({
            tipo,
            status: 'criado',
            usuario,
        });
        return await processo.save();
    }

    async updateStatus(id: string, status: ProcessoImportacao['status'], extra: Partial<ProcessoImportacao> = {},): Promise<ProcessoImportacao> {
        const updated = await this.processoImportacaoModel.findByIdAndUpdate(id, { status, ...extra }, { new: true , runValidators: true },).exec();
        if (!updated) {
            throw new Error(`Processo de id ${id} não encontrado`);
        }
        return updated;
    }	

   async buscarPorId(id: string): Promise<ProcessoImportacao> {
    const processo = await this.processoImportacaoModel.findById(id).exec();
    if (!processo) {
        throw new Error(`ProcessoImportacao with id ${id} not found`);
    }
    return processo;
}
}
