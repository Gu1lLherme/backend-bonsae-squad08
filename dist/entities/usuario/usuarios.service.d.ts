import { Model, Connection } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioBatchDto } from './dto/create-usuario-batch.dto';
export declare class UsuariosService {
    private usuarioModel;
    private readonly connection;
    constructor(usuarioModel: Model<UsuarioDocument>, connection: Connection);
    create(dto: CreateUsuarioDto): Promise<Usuario>;
    '': any;
    createBatch(dto: CreateUsuarioBatchDto): Promise<{
        batchId: string;
        usuarios: any[];
    }>;
    updateInvalidUsuarios(id: string, updateDto: UpdateUsuarioDto): Promise<any>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateUsuarioDto): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
