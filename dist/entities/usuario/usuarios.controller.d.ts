import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CreateUsuarioBatchDto } from './dto/create-usuario-batch.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<{
        message: string;
        data: import("./schemas/usuario.schema").Usuario;
    }>;
    createBatch(dto: CreateUsuarioBatchDto): Promise<{
        batchId: string;
        usuarios: any[];
    }>;
    revalidarUsuario(id: string, updateDto: UpdateUsuarioDto): Promise<any>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").UsuarioDocument, {}> & import("./schemas/usuario.schema").Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").UsuarioDocument, {}> & import("./schemas/usuario.schema").Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").UsuarioDocument, {}> & import("./schemas/usuario.schema").Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").UsuarioDocument, {}> & import("./schemas/usuario.schema").Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
