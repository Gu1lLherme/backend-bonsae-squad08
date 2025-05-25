import { Document } from 'mongoose';
export type UsuarioDocument = Usuario & Document;
export declare class Usuario {
    perfil: string;
    subperfil?: string;
    nome: string;
    numeroOAB?: string;
    seccional?: string;
    email: string;
    matriculaIes?: string;
    telefone?: string;
    cpf?: string;
    senha: string;
    periodoCurricular?: string;
    observacoes?: string;
    batchId: string;
    valid: boolean;
    validationErrors?: string[];
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, Document<unknown, any, Usuario> & Usuario & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, Document<unknown, {}, import("mongoose").FlatRecord<Usuario>> & import("mongoose").FlatRecord<Usuario> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
