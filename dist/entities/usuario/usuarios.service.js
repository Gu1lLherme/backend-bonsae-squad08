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
        const problemas = [];
        if (!dto.perfil)
            problemas.push('Perfil é obrigatório.');
        if (!dto.nome)
            problemas.push('Nome é obrigatório.');
        if (!dto.email)
            problemas.push('Email é obrigatório.');
        if (!dto.cpf)
            problemas.push('CPF é obrigatório.');
        if (!dto.senha)
            problemas.push('Senha é obrigatória.');
        if (!dto.matriculaIes)
            problemas.push('Matrícula (IES) é obrigatória.');
        if (problemas.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Erros de validação no usuário.',
                erros: problemas,
            });
        }
        const [usuarioExistente, cpfExistente, matriculaExistente, telefoneExistente] = await Promise.all([
            this.usuarioModel.findOne({ email: dto.email }),
            this.usuarioModel.findOne({ cpf: dto.cpf }),
            this.usuarioModel.findOne({ matriculaIes: dto.matriculaIes }),
            dto.telefone ? this.usuarioModel.findOne({ telefone: dto.telefone }) : null,
        ]);
        if (usuarioExistente) {
            throw new common_1.BadRequestException('Email já cadastrado.');
        }
        if (cpfExistente) {
            throw new common_1.BadRequestException('CPF já cadastrado.');
        }
        if (matriculaExistente) {
            throw new common_1.BadRequestException('Matrícula (IES) já cadastrada.');
        }
        if (telefoneExistente) {
            throw new common_1.BadRequestException('Telefone já cadastrado.');
        }
        const usuario = new this.usuarioModel(dto);
        return usuario.save();
    }
    async bulkCreate(createUsuariosDto) {
        if (!Array.isArray(createUsuariosDto) || createUsuariosDto.length === 0) {
            throw new common_1.BadRequestException('Payload precisa ser uma lista de usuários.');
        }
        const erros = [];
        createUsuariosDto.forEach((usuario, index) => {
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
            }
        });
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Erros de validação nos usuários.',
                erros,
            });
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const emails = createUsuariosDto.map(u => u.email);
            const cpfs = createUsuariosDto.map(u => u.cpf);
            const matriculas = createUsuariosDto.map(u => u.matriculaIes);
            const telefones = createUsuariosDto.map(u => u.telefone).filter(Boolean);
            const existentes = await this.usuarioModel.find({
                $or: [
                    { email: { $in: emails } },
                    { cpf: { $in: cpfs } },
                    { matriculaIes: { $in: matriculas } },
                    { telefone: { $in: telefones } },
                ],
            }).session(session);
            if (existentes.length > 0) {
                const conflitos = existentes.map(e => ({
                    email: e.email,
                    cpf: e.cpf,
                    matriculaIes: e.matriculaIes,
                    telefone: e.telefone,
                }));
                throw new common_1.BadRequestException({
                    message: 'Existem conflitos com usuários já cadastrados.',
                    conflitos,
                });
            }
            const usuariosCriados = await this.usuarioModel.insertMany(createUsuariosDto, { session });
            await session.commitTransaction();
            return usuariosCriados;
        }
        catch (error) {
            await session.abortTransaction();
            console.error('Erro no bulkCreate de Usuários:', error);
            throw new common_1.InternalServerErrorException('Erro ao criar usuários em lote.');
        }
        finally {
            session.endSession();
        }
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