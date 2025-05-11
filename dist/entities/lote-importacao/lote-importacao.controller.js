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
exports.LoteImportacaoController = void 0;
const common_1 = require("@nestjs/common");
const lote_importacao_service_1 = require("./lote-importacao.service");
let LoteImportacaoController = class LoteImportacaoController {
    loteService;
    constructor(loteService) {
        this.loteService = loteService;
    }
    async obterLote(loteId, res) {
        const lote = await this.loteService.buscarPorLoteId(loteId);
        if (!lote) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Lote não encontrado' });
        }
        return res.status(common_1.HttpStatus.OK).json(lote);
    }
};
exports.LoteImportacaoController = LoteImportacaoController;
__decorate([
    (0, common_1.Get)(':loteId'),
    __param(0, (0, common_1.Param)('loteId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LoteImportacaoController.prototype, "obterLote", null);
exports.LoteImportacaoController = LoteImportacaoController = __decorate([
    (0, common_1.Controller)('lotes'),
    __metadata("design:paramtypes", [lote_importacao_service_1.LoteImportacaoService])
], LoteImportacaoController);
//# sourceMappingURL=lote-importacao.controller.js.map