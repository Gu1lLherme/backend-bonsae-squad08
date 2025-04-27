import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true, enum: [
    'Coordenador(a)', 'Professor(a)', 'Aluno(a)', 
    'Secretário(a)', 'Estagiário(a)', 'Advogado(a)'
  ]})
  perfil: string;

  @Prop()
  subperfil?: string;

  @Prop({ required: true })
  nome: string;

  @Prop()
  numeroOAB?: string;

  @Prop()
  seccional?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({type: String, unique: true, sparse: true})
  matriculaIes?: string;

  @Prop()
  telefone?: string;

  @Prop()
  cpf?: string;

  @Prop({ required: true })
  senha: string;

  @Prop()
  periodoCurricular?: string;

  @Prop()
  observacoes?: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
