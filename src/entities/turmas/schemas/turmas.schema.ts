import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TurmaDocument = Turma & Document;

@Schema({ timestamps: true, versionKey: false })
@Schema({ collection: 'turmas' }) // Define o nome da coleção no MongoDB
export class Turma {
  
  @Prop({ required: true })
  codigoDisciplina: string; 

  @Prop({ required: true })
  turno: string;

  @Prop({ required: true })
  codigoTurma: string;

  @Prop({ required: true })
  nomeTurma: string; 

  @Prop({ required: true, enum: ['aluno', 'professor'] })
  tipo: 'aluno' | 'professor';

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }] ,default: [] })
  usuarios?: Types.ObjectId[]; // Referência a usuários (alunos ou professores) associados à turma

  @Prop({ required: true }) batchId: string; // Identificador do lote

  @Prop({ default: true }) valid: boolean;

  @Prop({ default: null, type: [String] }) validationErrors?: string[];
}

export const TurmaSchema = SchemaFactory.createForClass(Turma); 