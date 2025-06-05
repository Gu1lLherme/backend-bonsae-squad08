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
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const processo_importacao_service_1 = require("../../processo-importacao/processo-importacao.service");
const processo_importacao_schema_1 = require("../../processo-importacao/schemas/processo-importacao.schema");
let UsuariosService = class UsuariosService {
    usuarioModel;
    processoImportacaoService;
    constructor(usuarioModel, processoImportacaoService) {
        this.usuarioModel = usuarioModel;
        this.processoImportacaoService = processoImportacaoService;
    }
    async create(dto) {
        const emailExistente = await this.usuarioModel.findOne({ email: dto.email });
        if (emailExistente) {
            throw new common_1.BadRequestException('Email do usuário já cadastrado.');
        }
        const novoUsuario = new this.usuarioModel(dto);
        return await novoUsuario.save();
    }
    async createBatch(dto) {
        const processId = dto.processId;
        if (!processId) {
            throw new common_1.BadRequestException('processId é obrigatório');
        }
        const processo = await this.processoImportacaoService.getProcessoById(processId);
        if (processo.status !== processo_importacao_schema_1.StatusImportacao.EM_ANDAMENTO) {
            throw new common_1.BadRequestException('Processo não está em andamento');
        }
        if (processo.etapaAtual !== processo_importacao_schema_1.EtapaImportacao.PERIODOS) {
            throw new common_1.BadRequestException('Processo não está na etapa de PERIODOS');
        }
        const usuariosComStatus = dto.usuarios.map((usuario) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_usuario_dto_1.CreateUsuarioDto, usuario);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...usuario,
                processId: processId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.usuarioModel.insertMany(usuariosComStatus);
        await this.processoImportacaoService.marcarEtapaConcluida(processId, 'usuarios');
        return {
            batchId: processId,
            usuarios: usuariosComStatus,
        };
    }
    async updateInvalidUsuarios(id, updateDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException("ID invalido");
        }
        const instance = (0, class_transformer_1.plainToInstance)(update_usuario_dto_1.UpdateUsuarioDto, updateDto);
        const errors = (0, class_validator_1.validateSync)(instance);
        const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
        const valid = validationErrors.length === 0;
        const usuario = await this.usuarioModel.findByIdAndUpdate(id, {
            $set: {
                ...updateDto,
                valid,
                validationErrors,
            }
        }, { new: true });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return {
            message: 'Usuario Atualizado com sucesso',
            date: usuario,
        };
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
    __metadata("design:paramtypes", [mongoose_2.Model,
        processo_importacao_service_1.ProcessoImportacaoService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map