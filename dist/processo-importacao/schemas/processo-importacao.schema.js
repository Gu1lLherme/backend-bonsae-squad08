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
exports.ProcessoImportacaoSchema = exports.ProcessoImportacao = exports.StatusImportacao = exports.EtapaImportacao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
var EtapaImportacao;
(function (EtapaImportacao) {
    EtapaImportacao["PERIODOS"] = "PERIODOS";
    EtapaImportacao["DISCIPLINAS"] = "DISCIPLINAS";
    EtapaImportacao["TURMAS"] = "TURMAS";
    EtapaImportacao["USUARIOS"] = "USUARIOS";
    EtapaImportacao["FINALIZADO"] = "FINALIZADO";
})(EtapaImportacao || (exports.EtapaImportacao = EtapaImportacao = {}));
var StatusImportacao;
(function (StatusImportacao) {
    StatusImportacao["EM_ANDAMENTO"] = "EM_ANDAMENTO";
    StatusImportacao["CONCLUIDO"] = "CONCLUIDO";
    StatusImportacao["ERRO"] = "ERRO";
})(StatusImportacao || (exports.StatusImportacao = StatusImportacao = {}));
let ProcessoImportacao = class ProcessoImportacao {
    processId;
    etapaAtual;
    status;
    iniciadoPor;
    erros;
    totalRegistros;
};
exports.ProcessoImportacao = ProcessoImportacao;
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, default: () => (0, uuid_1.v4)() }),
    __metadata("design:type", String)
], ProcessoImportacao.prototype, "processId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(EtapaImportacao),
        default: EtapaImportacao.PERIODOS,
    }),
    __metadata("design:type", String)
], ProcessoImportacao.prototype, "etapaAtual", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(StatusImportacao),
        default: StatusImportacao.EM_ANDAMENTO,
    }),
    __metadata("design:type", String)
], ProcessoImportacao.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'anônimo' }),
    __metadata("design:type", String)
], ProcessoImportacao.prototype, "iniciadoPor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Array, default: [] }),
    __metadata("design:type", Array)
], ProcessoImportacao.prototype, "erros", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ProcessoImportacao.prototype, "totalRegistros", void 0);
exports.ProcessoImportacao = ProcessoImportacao = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ProcessoImportacao);
exports.ProcessoImportacaoSchema = mongoose_1.SchemaFactory.createForClass(ProcessoImportacao);
//# sourceMappingURL=processo-importacao.schema.js.map