import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DisciplinaDocument = Disciplina & Document;

@Schema()
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
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);