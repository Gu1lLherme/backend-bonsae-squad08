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
exports.DisciplinaController = void 0;
const common_1 = require("@nestjs/common");
const disciplina_service_1 = require("./disciplina.service");
const update_disciplina_dto_1 = require("./dto/update-disciplina.dto");
const create_disciplina_batch_dto_1 = require("./dto/create-disciplina-batch.dto");
let DisciplinaController = class DisciplinaController {
    disciplinaService;
    constructor(disciplinaService) {
        this.disciplinaService = disciplinaService;
    }
    async createBatch(dto) {
        return this.disciplinaService.createBatch(dto);
    }
    async revalidarTurma(id, updateDto) {
        return this.disciplinaService.updateInvalidDisciplinas(id, updateDto);
    }
    findAll() {
        return this.disciplinaService.findAll();
    }
    findOne(id) {
        return this.disciplinaService.findOne(+id);
    }
    update(id, updateDisciplinaDto) {
        return this.disciplinaService.update(+id, updateDisciplinaDto);
    }
    remove(id) {
        return this.disciplinaService.remove(+id);
    }
};
exports.DisciplinaController = DisciplinaController;
__decorate([
    (0, common_1.Post)('batch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_disciplina_batch_dto_1.CreateDisciplinaBatchDto]),
    __metadata("design:returntype", Promise)
], DisciplinaController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Patch)(':id/revalida-batch'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_disciplina_dto_1.UpdateDisciplinaDto]),
    __metadata("design:returntype", Promise)
], DisciplinaController.prototype, "revalidarTurma", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DisciplinaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DisciplinaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_disciplina_dto_1.UpdateDisciplinaDto]),
    __metadata("design:returntype", void 0)
], DisciplinaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DisciplinaController.prototype, "remove", null);
exports.DisciplinaController = DisciplinaController = __decorate([
    (0, common_1.Controller)('disciplina'),
    __metadata("design:paramtypes", [disciplina_service_1.DisciplinaService])
], DisciplinaController);
//# sourceMappingURL=disciplina.controller.js.map