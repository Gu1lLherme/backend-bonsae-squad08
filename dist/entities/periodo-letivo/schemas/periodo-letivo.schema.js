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
exports.PeriodoLetivoSchema = exports.PeriodoLetivo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PeriodoLetivo = class PeriodoLetivo {
    codigo_periodo_letivo;
    periodo_letivo;
    data_incial;
    data_final;
};
exports.PeriodoLetivo = PeriodoLetivo;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PeriodoLetivo.prototype, "codigo_periodo_letivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Number)
], PeriodoLetivo.prototype, "periodo_letivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "data_incial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", Date)
], PeriodoLetivo.prototype, "data_final", void 0);
exports.PeriodoLetivo = PeriodoLetivo = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PeriodoLetivo);
exports.PeriodoLetivoSchema = mongoose_1.SchemaFactory.createForClass(PeriodoLetivo);
//# sourceMappingURL=periodo-letivo.schema.js.map