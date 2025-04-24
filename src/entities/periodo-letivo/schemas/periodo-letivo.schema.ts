import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PeriodoLetivoDocument = PeriodoLetivo & Document;

@Schema({timestamps:true})
export class PeriodoLetivo{
    
    @Prop({required:true, unique:true})
    codigo_periodo_letivo: string;
    
    @Prop({required:true, unique:true})
    periodo_letivo: number; 
    
    @Prop({required:true, unique:true})
    data_incial: Date;

    @Prop({required:true, unique:true})
    data_final:  Date; 

}

export const PeriodoLetivoSchema = SchemaFactory.createForClass(PeriodoLetivo);