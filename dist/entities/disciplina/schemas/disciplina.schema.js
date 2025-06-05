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
exports.DisciplinaSchema = exports.Disciplina = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Disciplina = class Disciplina {
    periodoLetivo;
    disciplina;
    codigoDisciplina;
    dataInicial;
    dataFinal;
    categoria;
    periodoCurricular;
    estado;
    campus;
    processId;
    valid;
    validationErrors;
};
exports.Disciplina = Disciplina;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "periodoLetivo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "disciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Disciplina.prototype, "dataInicial", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Disciplina.prototype, "dataFinal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "categoria", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "periodoCurricular", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Disciplina.prototype, "campus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Disciplina.prototype, "processId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Disciplina.prototype, "valid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: [String] }),
    __metadata("design:type", Array)
], Disciplina.prototype, "validationErrors", void 0);
exports.Disciplina = Disciplina = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false }),
    (0, mongoose_1.Schema)({ collection: 'disciplinas' })
], Disciplina);
exports.DisciplinaSchema = mongoose_1.SchemaFactory.createForClass(Disciplina);
//# sourceMappingURL=disciplina.schema.js.map