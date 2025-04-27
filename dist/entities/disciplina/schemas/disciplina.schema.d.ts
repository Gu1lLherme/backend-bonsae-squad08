import { Document, Types } from 'mongoose';
export type DisciplinaDocument = Disciplina & Document;
export declare class Disciplina {
    periodoLetivo: string;
    disciplina: string;
    codigoDisciplina: string;
    dataInicial: Date;
    dataFinal: Date;
    categoria: string;
    periodoCurricular?: string;
    estado?: string;
    campus?: string;
}
export declare const DisciplinaSchema: import("mongoose").Schema<Disciplina, import("mongoose").Model<Disciplina, any, any, any, Document<unknown, any, Disciplina> & Disciplina & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Disciplina, Document<unknown, {}, import("mongoose").FlatRecord<Disciplina>> & import("mongoose").FlatRecord<Disciplina> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
