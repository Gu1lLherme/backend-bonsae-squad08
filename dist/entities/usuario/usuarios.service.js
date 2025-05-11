"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
let UsuariosService = class UsuariosService {
    usuarioModel;
    connection;
    constructor(usuarioModel, connection) {
        this.usuarioModel = usuarioModel;
        this.connection = connection;
    }
    async create(dto) {
        const emailExistente = await this.usuarioModel.findOne({ email: dto.email });
        if (emailExistente) {
            throw new common_1.BadRequestException('Email do usuário já cadastrado.');
        }
        const novoUsuario = new this.usuarioModel(dto);
        return await novoUsuario.save();
    }
    async bulkCreate(createUsuariosDto) {
        if (!Array.isArray(createUsuariosDto) || createUsuariosDto.length === 0) {
            throw new common_1.BadRequestException('Payload precisa ser uma lista de usuários.');
        }
        const erros = [];
        createUsuariosDto.filter((usuario, index) => {
            const problemas = [];
            if (!usuario.perfil)
                problemas.push('Perfil é obrigatório.');
            if (!usuario.nome)
                problemas.push('Nome é obrigatório.');
            if (!usuario.email)
                problemas.push('Email é obrigatório.');
            if (!usuario.cpf)
                problemas.push('CPF é obrigatório.');
            if (!usuario.senha)
                problemas.push('Senha é obrigatória.');
            if (!usuario.matriculaIes || usuario.matriculaIes.trim() === '')
                problemas.push('Matrícula (IES) é obrigatória.');
            if (problemas.length > 0) {
                erros.push({ index, error: problemas.join(' | ') });
                return false;
            }
            return true;
        });
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Erros de validação nos usuários.',
                erros,
            });
        }
        const usuariosCriados = await this.usuarioModel.insertMany(createUsuariosDto);
        return usuariosCriados.map(usuario => usuario.toObject());
    }
    async findAll() {
        return this.usuarioModel.find().exec();
    }
    async findOne(id) {
        const usuario = await this.usuarioModel.findById(id);
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return usuario;
    }
    async update(id, dto) {
        const usuario = await this.usuarioModel.findByIdAndUpdate(id, dto, { new: true });
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return usuario;
    }
    async remove(id) {
        const usuario = await this.usuarioModel.findByIdAndDelete(id);
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return usuario;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map