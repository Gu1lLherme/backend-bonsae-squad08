import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Document, Types } from 'mongoose';

export type DisciplinaDocument = Disciplina & Document;


@Schema({ timestamps: true, versionKey: false })
@Schema({ collection: 'disciplinas' }) // Define o nome da coleção no MongoDB
export class Disciplina {
  @Prop()
  periodoLetivo: string; // Identição do período letivo

  @Prop()
  disciplina: string;

  @Prop()
  codigoDisciplina: string;

  @Prop()
  dataInicial: Date;

  @Prop()
  dataFinal: Date;

  @Prop()
  categoria: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  estado?: string;

  @Prop()
  campus?: string;

  @Prop({ required: true }) batchId: string; // Identificador do lote

  @Prop({ default: true }) valid: boolean;

  @Prop({ default: null, type: [String] }) validationErrors?: string[];

}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);