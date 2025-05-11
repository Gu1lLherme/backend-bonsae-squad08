"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoteImportacaoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const lote_importacao_schema_1 = require("./schemas/lote-importacao.schema");
const lote_importacao_service_1 = require("./lote-importacao.service");
const lote_importacao_controller_1 = require("./lote-importacao.controller");
let LoteImportacaoModule = class LoteImportacaoModule {
};
exports.LoteImportacaoModule = LoteImportacaoModule;
exports.LoteImportacaoModule = LoteImportacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: lote_importacao_schema_1.LoteImportacao.name, schema: lote_importacao_schema_1.LoteImportacaoSchema }]),
        ],
        providers: [lote_importacao_service_1.LoteImportacaoService],
        exports: [lote_importacao_service_1.LoteImportacaoService],
        controllers: [lote_importacao_controller_1.LoteImportacaoController]
    })
], LoteImportacaoModule);
//# sourceMappingURL=lote-importacao.module.js.map