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
exports.TurmaSQLEntity = void 0;
const typeorm_1 = require("typeorm");
let TurmaSQLEntity = class TurmaSQLEntity {
    id;
    codigoDisciplina;
    turno;
    codigoTurma;
    nomeTurma;
    tipo;
    usuarios;
};
exports.TurmaSQLEntity = TurmaSQLEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "turno", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "codigoTurma", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "nomeTurma", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TurmaSQLEntity.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { nullable: true }),
    __metadata("design:type", Array)
], TurmaSQLEntity.prototype, "usuarios", void 0);
exports.TurmaSQLEntity = TurmaSQLEntity = __decorate([
    (0, typeorm_1.Entity)('turmas')
], TurmaSQLEntity);
//# sourceMappingURL=turma-sql.entity.js.map