import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  matricula: string;

  @Prop({ required: true, enum: ['aluno', 'professor'] })
  tipo: 'aluno' | 'professor';

  @Prop()
  curso?: string; // usado para alunos

  @Prop()
  departamento?: string; // usado para professores

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Turma' }] })
  turmas: Types.ObjectId[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
