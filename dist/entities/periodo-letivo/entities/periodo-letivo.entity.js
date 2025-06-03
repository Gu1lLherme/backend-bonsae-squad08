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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodoLetivo = void 0;
const typeorm_1 = require("typeorm");
let PeriodoLetivo = class PeriodoLetivo {
    id;
    codigoPeriodoLetivo;
    periodoLetivo;
    dataInicial;
    dataFinal;
    batchId;
    valid;
    validationErrors;
    created_at;
    updated_at;
};
exports.PeriodoLetivo = PeriodoLetivo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PeriodoLetivo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PeriodoLetivo.prototype, "codigoPeriodoLetivo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PeriodoLetivo.prototype, "periodoLetivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "dataInicial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "dataFinal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PeriodoLetivo.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PeriodoLetivo.prototype, "valid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], PeriodoLetivo.prototype, "validationErrors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "updated_at", void 0);
exports.PeriodoLetivo = PeriodoLetivo = __decorate([
    (0, typeorm_1.Entity)('periodos_letivos')
], PeriodoLetivo);
//# sourceMappingURL=periodo-letivo.entity.js.map