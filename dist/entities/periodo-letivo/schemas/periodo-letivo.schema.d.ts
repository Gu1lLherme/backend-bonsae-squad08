import { Document, Types } from 'mongoose';
export type PeriodoLetivoDocument = PeriodoLetivo & Document;
export declare class PeriodoLetivo {
    codigo_periodo_letivo: string;
    periodo_letivo: number;
    data_incial: Date;
    data_final: Date;
}
export declare const PeriodoLetivoSchema: import("mongoose").Schema<PeriodoLetivo, import("mongoose").Model<PeriodoLetivo, any, any, any, Document<unknown, any, PeriodoLetivo, any> & PeriodoLetivo & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PeriodoLetivo, Document<unknown, {}, import("mongoose").FlatRecord<PeriodoLetivo>, {}> & import("mongoose").FlatRecord<PeriodoLetivo> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
