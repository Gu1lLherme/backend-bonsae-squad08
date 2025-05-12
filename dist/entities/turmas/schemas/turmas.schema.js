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
exports.TurmaSchema = exports.Turma = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Turma = class Turma {
    codigoDisciplina;
    turno;
    codigoTurma;
    nomeTurma;
    tipo;
    usuarios;
    batchId;
    valid;
    validationErrors;
};
exports.Turma = Turma;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Turma.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Turma.prototype, "turno", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Turma.prototype, "codigoTurma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Turma.prototype, "nomeTurma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['aluno', 'professor'] }),
    __metadata("design:type", String)
], Turma.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Usuario' }], default: [] }),
    __metadata("design:type", Array)
], Turma.prototype, "usuarios", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Turma.prototype, "batchId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Turma.prototype, "valid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: [String] }),
    __metadata("design:type", Array)
], Turma.prototype, "validationErrors", void 0);
exports.Turma = Turma = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false }),
    (0, mongoose_1.Schema)({ collection: 'turmas' })
], Turma);
exports.TurmaSchema = mongoose_1.SchemaFactory.createForClass(Turma);
//# sourceMappingURL=turmas.schema.js.map