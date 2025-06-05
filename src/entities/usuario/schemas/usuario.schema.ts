import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop()
  perfil: string;

  @Prop()
  subperfil?: string;

  @Prop()
  nome: string;

  @Prop()
  numeroOAB?: string;

  @Prop()
  seccional?: string;

  @Prop()
  email: string;

  @Prop()
  matriculaIes?: string;

  @Prop()
  telefone?: string;

  @Prop()
  cpf?: string;

  @Prop()
  senha: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  observacoes?: string;

  @Prop({ required: true }) processId: string; // Identificador do lote

  @Prop({ default: false }) valid: boolean;

  @Prop({ default: null, type: [String] }) validationErrors?: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
