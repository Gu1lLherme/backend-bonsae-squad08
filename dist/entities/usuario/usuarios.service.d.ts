import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioBatchDto } from './dto/create-usuario-batch.dto';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
export declare class UsuariosService {
    private usuarioModel;
    private readonly processoImportacaoService;
    constructor(usuarioModel: Model<UsuarioDocument>, processoImportacaoService: ProcessoImportacaoService);
    create(dto: CreateUsuarioDto): Promise<Usuario>;
    createBatch(dto: CreateUsuarioBatchDto): Promise<any>;
    updateInvalidUsuarios(id: string, updateDto: UpdateUsuarioDto): Promise<any>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument> & Usuario & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument> & Usuario & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateUsuarioDto): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument> & Usuario & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument> & Usuario & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
