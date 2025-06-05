import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TurmaDocument = Turma & Document;

@Schema({ timestamps: true, versionKey: false })
@Schema({ collection: 'turmas' }) // Define o nome da coleção no MongoDB
export class Turma {
  
  @Prop()
  codigoDisciplina: string; 

  @Prop()
  turno: string;

  @Prop()
  codigoTurma: string;

  @Prop()
  nomeTurma: string; 

  @Prop()
  tipo: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Usuario' }] ,default: [] })
  usuarios?: Types.ObjectId[]; // Referência a usuários (alunos ou professores) associados à turma

  @Prop({ required: true }) processId: string; // Identificador do lote

  @Prop({ default: false }) valid: boolean;

  @Prop({ default: null, type: [String] }) validationErrors?: string[];
}

export const TurmaSchema = SchemaFactory.createForClass(Turma); 