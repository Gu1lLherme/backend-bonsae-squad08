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
exports.TurmasController = void 0;
const common_1 = require("@nestjs/common");
const turmas_service_1 = require("./turmas.service");
const update_turma_dto_1 = require("./dto/update-turma.dto");
const create_turma_batch_dto_1 = require("./dto/create-turma-batch.dto");
let TurmasController = class TurmasController {
    turmasService;
    constructor(turmasService) {
        this.turmasService = turmasService;
    }
    async createBatch(dto) {
        return this.turmasService.createBatch(dto);
    }
    async revalidarTurma(id, updateDto) {
        return this.turmasService.updateInvalidTurmas(id, updateDto);
    }
    async persistirValidas(batchId) {
        return this.turmasService.salvarValidasSql(batchId);
    }
};
exports.TurmasController = TurmasController;
__decorate([
    (0, common_1.Post)('batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_turma_batch_dto_1.CreateTurmaBatchDto]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Patch)(':id/revalidar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_turma_dto_1.UpdateTurmaDto]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "revalidarTurma", null);
__decorate([
    (0, common_1.Post)('persistir-validas/:batchId'),
    __param(0, (0, common_1.Param)('batchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TurmasController.prototype, "persistirValidas", null);
exports.TurmasController = TurmasController = __decorate([
    (0, common_1.Controller)('turmas'),
    __metadata("design:paramtypes", [turmas_service_1.TurmasService])
], TurmasController);
//# sourceMappingURL=turmas.controller.js.map