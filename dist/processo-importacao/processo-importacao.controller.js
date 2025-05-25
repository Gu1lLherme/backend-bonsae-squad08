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
const periodo_letivo_service_1 = require("../entities/periodo-letivo/periodo-letivo.service");
const import_periodo_letivo_dto_1 = require("../entities/periodo-letivo/dto/import-periodo-letivo.dto");
let ProcessoImportacaoController = class ProcessoImportacaoController {
    processoImportacaoService;
    periodoLetivoService;
    constructor(processoImportacaoService, periodoLetivoService) {
        this.processoImportacaoService = processoImportacaoService;
        this.periodoLetivoService = periodoLetivoService;
    }
    async iniciarProcessoImportacao(dto, req) {
        const { processId, periodos } = dto;
        await this.periodoLetivoService.createBatch({ processId, periodos: Array.isArray(periodos) ? periodos : [periodos] });
        await this.processoImportacaoService.createProcesso(processId, 'periodo-letivo');
        return {
            message: 'Processo de importação iniciado com sucesso!',
            processId,
        };
    }
};
exports.ProcessoImportacaoController = ProcessoImportacaoController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    })),
    (0, common_1.Post)('iniciar'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [import_periodo_letivo_dto_1.ImportPeriodoLetivoDto, Object]),
    __metadata("design:returntype", Promise)
], ProcessoImportacaoController.prototype, "iniciarProcessoImportacao", null);
exports.ProcessoImportacaoController = ProcessoImportacaoController = __decorate([
    (0, common_1.Controller)('processo-importacao'),
    __metadata("design:paramtypes", [processo_importacao_service_1.ProcessoImportacaoService,
        periodo_letivo_service_1.PeriodoLetivoService])
], ProcessoImportacaoController);
//# sourceMappingURL=processo-importacao.controller.js.map