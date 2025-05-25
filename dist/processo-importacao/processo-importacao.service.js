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
exports.ProcessoImportacaoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const processo_importacao_schema_1 = require("./schemas/processo-importacao.schema");
let ProcessoImportacaoService = class ProcessoImportacaoService {
    processoImportacaoModel;
    constructor(processoImportacaoModel) {
        this.processoImportacaoModel = processoImportacaoModel;
    }
    async createProcesso(tipo, usuario) {
        const processo = new this.processoImportacaoModel({
            tipo,
            status: 'criado',
            usuario,
        });
        return await processo.save();
    }
    async updateStatus(id, status, extra = {}) {
        const updated = await this.processoImportacaoModel.findByIdAndUpdate(id, { status, ...extra }, { new: true, runValidators: true }).exec();
        if (!updated) {
            throw new Error(`Processo de id ${id} não encontrado`);
        }
        return updated;
    }
    async buscarPorId(id) {
        const processo = await this.processoImportacaoModel.findById(id).exec();
        if (!processo) {
            throw new Error(`ProcessoImportacao with id ${id} not found`);
        }
        return processo;
    }
};
exports.ProcessoImportacaoService = ProcessoImportacaoService;
exports.ProcessoImportacaoService = ProcessoImportacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(processo_importacao_schema_1.ProcessoImportacao.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProcessoImportacaoService);
//# sourceMappingURL=processo-importacao.service.js.map