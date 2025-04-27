import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DisciplinaDocument = Disciplina & Document;

@Schema()
export class Disciplina {
  @Prop({ required: true })
  periodoLetivo: string; // Identição do período letivo

  @Prop({ required: true })
  disciplina: string;

  @Prop({ required: true, unique: true })
  codigoDisciplina: string;

  @Prop({ required: true })
  dataInicial: Date;

  @Prop({ required: true })
  dataFinal: Date;

  @Prop({ required: true, enum: ['Curso', 'NPJ', 'Projetos Extensionistas', 'TCC'] })
  categoria: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  estado?: string;

  @Prop()
  campus?: string;
}

export const DisciplinaSchema = SchemaFactory.createForClass(Disciplina);