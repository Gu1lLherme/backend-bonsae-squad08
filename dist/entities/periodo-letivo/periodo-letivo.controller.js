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
exports.PeriodoLetivoController = void 0;
const common_1 = require("@nestjs/common");
const periodo_letivo_service_1 = require("./periodo-letivo.service");
const update_periodo_letivo_dto_1 = require("./dto/update-periodo-letivo.dto");
const create_periodo_letivo_batch_dto_1 = require("./dto/create-periodo-letivo-batch.dto");
let PeriodoLetivoController = class PeriodoLetivoController {
    periodoLetivoService;
    constructor(periodoLetivoService) {
        this.periodoLetivoService = periodoLetivoService;
    }
    async createBatch(dto) {
        return this.periodoLetivoService.createBatch(dto);
    }
    async revalidarPeriodo(id, updateDto) {
        return this.periodoLetivoService.updateInvalidPeriodos(id, updateDto);
    }
};
exports.PeriodoLetivoController = PeriodoLetivoController;
__decorate([
    (0, common_1.Post)('Batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_periodo_letivo_batch_dto_1.CreatePeriodoLetivoBatchDto]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Patch)(':id/revalidar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_periodo_letivo_dto_1.UpdatePeriodoLetivoDto]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "revalidarPeriodo", null);
exports.PeriodoLetivoController = PeriodoLetivoController = __decorate([
    (0, common_1.Controller)('periodo-letivo'),
    __metadata("design:paramtypes", [periodo_letivo_service_1.PeriodoLetivoService])
], PeriodoLetivoController);
//# sourceMappingURL=periodo-letivo.controller.js.map