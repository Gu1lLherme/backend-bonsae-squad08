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
const create_periodo_letivo_dto_1 = require("./dto/create-periodo-letivo.dto");
const update_periodo_letivo_dto_1 = require("./dto/update-periodo-letivo.dto");
let PeriodoLetivoController = class PeriodoLetivoController {
    periodoLetivoService;
    constructor(periodoLetivoService) {
        this.periodoLetivoService = periodoLetivoService;
    }
    async create(createPeriodoLetivoDto) {
        const periodo = await this.periodoLetivoService.create(createPeriodoLetivoDto);
        return { message: 'Período letivo criado com sucesso!', data: periodo };
    }
    async bulkCreate(createPeriodoLetivoDto) {
        const periodosCriados = await this.periodoLetivoService.bulkCreate(createPeriodoLetivoDto);
        return {
            message: 'Períodos registrados com sucesso!',
            data: periodosCriados,
        };
    }
    async findAll() {
        const periodos = await this.periodoLetivoService.findAll();
        return { message: 'Lista de períodos letivos!', data: periodos };
    }
    async findOne(id) {
        const periodo = await this.periodoLetivoService.findOne(id);
        return { message: 'Detalhes do período letivo!', data: periodo };
    }
    async update(id, updatePeriodoLetivoDto) {
        const periodo = await this.periodoLetivoService.update(id, updatePeriodoLetivoDto);
        return { message: 'Período letivo atualizado com sucesso!', data: periodo };
    }
    async remove(id) {
        await this.periodoLetivoService.remove(id);
        return { message: 'Período letivo removido com sucesso!' };
    }
};
exports.PeriodoLetivoController = PeriodoLetivoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_periodo_letivo_dto_1.CreatePeriodoLetivoDto]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_periodo_letivo_dto_1.UpdatePeriodoLetivoDto]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PeriodoLetivoController.prototype, "remove", null);
exports.PeriodoLetivoController = PeriodoLetivoController = __decorate([
    (0, common_1.Controller)('periodo-letivo'),
    __metadata("design:paramtypes", [periodo_letivo_service_1.PeriodoLetivoService])
], PeriodoLetivoController);
//# sourceMappingURL=periodo-letivo.controller.js.map