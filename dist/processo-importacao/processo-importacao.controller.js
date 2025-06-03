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
exports.ProcessoImportacaoController = void 0;
const common_1 = require("@nestjs/common");
const processo_importacao_service_1 = require("./processo-importacao.service");
let ProcessoImportacaoController = class ProcessoImportacaoController {
    processoService;
    constructor(processoService) {
        this.processoService = processoService;
    }
    async iniciar() {
        const iniciadoPor = 'anônimo';
        return this.processoService.createProcesso(iniciadoPor);
    }
    async getProcesso(processId) {
        return this.processoService.getProcessoById(processId);
    }
    async updateProcesso(processId, body) {
        return this.processoService.updateProcesso(processId, body.etapa, body.status, body.totalRegistros, body.erros);
    }
};
exports.ProcessoImportacaoController = ProcessoImportacaoController;
__decorate([
    (0, common_1.Post)('iniciar'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProcessoImportacaoController.prototype, "iniciar", null);
__decorate([
    (0, common_1.Get)(':processId'),
    __param(0, (0, common_1.Param)('processId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProcessoImportacaoController.prototype, "getProcesso", null);
__decorate([
    (0, common_1.Patch)(':processId'),
    __param(0, (0, common_1.Param)('processId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProcessoImportacaoController.prototype, "updateProcesso", null);
exports.ProcessoImportacaoController = ProcessoImportacaoController = __decorate([
    (0, common_1.Controller)('processo-importacao'),
    __metadata("design:paramtypes", [processo_importacao_service_1.ProcessoImportacaoService])
], ProcessoImportacaoController);
//# sourceMappingURL=processo-importacao.controller.js.map