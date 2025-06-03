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
exports.Disciplina = void 0;
const typeorm_1 = require("typeorm");
let Disciplina = class Disciplina {
    id;
    periodoLetivo;
    disciplina;
    codigoDisciplina;
    dataInicial;
    dataFinal;
    categoria;
    periodoCurricular;
    estado;
    campus;
    batchId;
    valid;
    validationErrors;
    created_at;
    updated_at;
};
exports.Disciplina = Disciplina;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Disciplina.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disciplina.prototype, "periodoLetivo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disciplina.prototype, "disciplina", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disciplina.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Disciplina.prototype, "dataInicial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Disciplina.prototype, "dataFinal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disciplina.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Disciplina.prototype, "periodoCurricular", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Disciplina.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Disciplina.prototype, "campus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Disciplina.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Disciplina.prototype, "valid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Disciplina.prototype, "validationErrors", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Disciplina.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Disciplina.prototype, "updated_at", void 0);
exports.Disciplina = Disciplina = __decorate([
    (0, typeorm_1.Entity)('disciplinas')
], Disciplina);
//# sourceMappingURL=disciplina.entity.js.map