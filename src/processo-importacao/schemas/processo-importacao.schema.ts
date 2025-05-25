import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProcessoImportacaoDocument = ProcessoImportacao & Document;

@Schema({timestamps: true})
export class ProcessoImportacao {
    @Prop ({ required: true })
    tipo: 'Periodo-Letivo' | 'Disciplina' | 'Turmas'  | 'Usuario';
    
    @Prop ({ required: true })
    status: 'criado' | 'arquivo-enviado' | 'validando' | 'concluido';

    @Prop ()
    usuario?: string;

    @Prop ()
    nomeArquivo?: string;

    @Prop()
    totalRegistros?: number;

}

export const ProcessoImportacaoSchema = SchemaFactory.createForClass(ProcessoImportacao);