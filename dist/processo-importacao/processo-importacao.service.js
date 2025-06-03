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
    processoModel;
    constructor(processoModel) {
        this.processoModel = processoModel;
    }
    async createProcesso(iniciadoPor = 'anônimo') {
        const processo = await this.processoModel.create({ iniciadoPor });
        return { processId: processo.processId };
    }
    async updateProcesso(processId, etapa, status, totalRegistros, erros) {
        const update = {};
        if (etapa)
            update.etapaAtual = etapa;
        if (status)
            update.status = status;
        if (typeof totalRegistros === 'number')
            update.totalRegistros = totalRegistros;
        if (erros)
            update.erros = erros;
        const processo = await this.processoModel.findOneAndUpdate({ processId }, update, { new: true });
        if (!processo)
            throw new common_1.NotFoundException(`Processo ${processId} não encontrado.`);
        return processo;
    }
    async getProcessoById(processId) {
        const processo = await this.processoModel.findOne({ processId });
        if (!processo)
            throw new common_1.NotFoundException(`Processo ${processId} não encontrado.`);
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