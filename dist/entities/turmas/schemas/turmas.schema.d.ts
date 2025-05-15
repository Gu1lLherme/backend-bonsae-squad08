import { Document, Types } from 'mongoose';
export type TurmaDocument = Turma & Document;
export declare class Turma {
    codigoDisciplina: string;
    turno: string;
    codigoTurma: string;
    nomeTurma: string;
    tipo: string;
    usuarios?: Types.ObjectId[];
    batchId: string;
    valid: boolean;
    validationErrors?: string[];
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
