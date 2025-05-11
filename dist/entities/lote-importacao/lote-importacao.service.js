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
exports.LoteImportacaoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lote_importacao_schema_1 = require("./schemas/lote-importacao.schema");
let LoteImportacaoService = class LoteImportacaoService {
    loteModel;
    constructor(loteModel) {
        this.loteModel = loteModel;
    }
    async criarLote(data) {
        const lote = new this.loteModel(data);
        return lote.save();
    }
    async atualizarErros(loteId, erros) {
        return this.loteModel.updateOne({ loteId }, {
            $set: {
                erros,
                status: 'com_erro',
                quantidade_sucesso: 0,
            },
        });
    }
    async finalizarLoteComSucesso(loteId, total) {
        return this.loteModel.updateOne({ loteId }, {
            $set: {
                status: 'importado',
                quantidade_sucesso: total,
            },
        });
    }
    async buscarPorLoteId(loteId) {
        return this.loteModel.findOne({ loteId });
    }
};
exports.LoteImportacaoService = LoteImportacaoService;
exports.LoteImportacaoService = LoteImportacaoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lote_importacao_schema_1.LoteImportacao.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoteImportacaoService);
//# sourceMappingURL=lote-importacao.service.js.map