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
exports.LoteImportacaoSchema = exports.LoteImportacao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let LoteImportacao = class LoteImportacao {
    loteId;
    tipo;
    nomeArquivo;
    status;
    erros;
    quantidade_total;
    quantidade_sucesso;
    dataEnvio;
};
exports.LoteImportacao = LoteImportacao;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoteImportacao.prototype, "loteId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoteImportacao.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LoteImportacao.prototype, "nomeArquivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['em_validacao', 'com_erro', 'importado'],
        default: 'em_validacao',
    }),
    __metadata("design:type", String)
], LoteImportacao.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                index: { type: Number },
                mensagens: { type: [String] },
                item: { type: Object },
            },
        ],
    }),
    __metadata("design:type", Array)
], LoteImportacao.prototype, "erros", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LoteImportacao.prototype, "quantidade_total", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LoteImportacao.prototype, "quantidade_sucesso", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], LoteImportacao.prototype, "dataEnvio", void 0);
exports.LoteImportacao = LoteImportacao = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], LoteImportacao);
exports.LoteImportacaoSchema = mongoose_1.SchemaFactory.createForClass(LoteImportacao);
//# sourceMappingURL=lote-importacao.schema.js.map