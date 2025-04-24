import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TurmaDocument = Turma & Document;

export class Turma {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  codigo: string;

  @Prop({ required: true, enum: ['aluno', 'professor'] })
  tipo: 'aluno' | 'professor';

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }] })
  usuarios?: Types.ObjectId[]; // Referência a usuários (alunos ou professores) associados à turma
}	

export const TurmaSchema = SchemaFactory.createForClass(Turma); 