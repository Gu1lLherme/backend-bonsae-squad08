import { Document, Types } from 'mongoose';
export type TurmaDocument = Turma & Document;
export declare class Turma {
    nome: string;
    codigo: string;
    tipo: 'aluno' | 'professor';
    usuarios?: Types.ObjectId[];
}
export declare const TurmaSchema: import("mongoose").Schema<Turma, import("mongoose").Model<Turma, any, any, any, Document<unknown, any, Turma, any> & Turma & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Turma, Document<unknown, {}, import("mongoose").FlatRecord<Turma>, {}> & import("mongoose").FlatRecord<Turma> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
