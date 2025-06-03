import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ProcessoImportacaoDocument = ProcessoImportacao & Document;

export enum EtapaImportacao {
  PERIODOS    = 'PERIODOS',
  DISCIPLINAS = 'DISCIPLINAS',
  TURMAS      = 'TURMAS',
  USUARIOS    = 'USUARIOS',
  FINALIZADO  = 'FINALIZADO',
}

export enum StatusImportacao {
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDO    = 'CONCLUIDO',
  ERRO         = 'ERRO',
}

@Schema({ timestamps: true })
export class ProcessoImportacao {
  
  @Prop({ type: String, unique: true, default: () => uuidv4() })
  processId: string;

 
  @Prop({
    type: String,
    enum: Object.values(EtapaImportacao),
    default: EtapaImportacao.PERIODOS,
  })
  etapaAtual: EtapaImportacao;

 
  @Prop({
    type: String,
    enum: Object.values(StatusImportacao),
    default: StatusImportacao.EM_ANDAMENTO,
  })
  status: StatusImportacao;

 
  @Prop({ type: String, default: 'anônimo' })
  iniciadoPor: string;

  
  @Prop({ type: Array, default: [] })
  erros: string[];

  
  @Prop({ type: Number, default: 0 })
  totalRegistros: number;

  
}

export const ProcessoImportacaoSchema = SchemaFactory.createForClass(ProcessoImportacao);
