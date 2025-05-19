import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PeriodoLetivoDocument = PeriodoLetivo & Document;

@Schema({timestamps:true})
export class PeriodoLetivo {
    @Prop()
    codigoPeriodoLetivo: string;
  
    @Prop()
    periodoLetivo: string;
  
    @Prop()
    dataInicial: Date;
  
    @Prop()
    dataFinal: Date;
  }
  
  export const PeriodoLetivoSchema = SchemaFactory.createForClass(PeriodoLetivo);