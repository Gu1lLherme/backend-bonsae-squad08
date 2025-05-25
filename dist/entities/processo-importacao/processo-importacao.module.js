"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessoImportacaoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const processo_importacao_schema_1 = require("./schemas/processo-importacao.schema");
const processo_importacao_service_1 = require("./processo-importacao.service");
const processo_importacao_controller_1 = require("./processo-importacao.controller");
const periodo_letivo_module_1 = require("../periodo-letivo/periodo-letivo.module");
const periodo_letivo_service_1 = require("../periodo-letivo/periodo-letivo.service");
let ProcessoImportacaoModule = class ProcessoImportacaoModule {
};
exports.ProcessoImportacaoModule = ProcessoImportacaoModule;
exports.ProcessoImportacaoModule = ProcessoImportacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: processo_importacao_schema_1.ProcessoImportacao.name, schema: processo_importacao_schema_1.ProcessoImportacaoSchema },
            ]),
            periodo_letivo_module_1.PeriodoLetivoModule,
        ],
        providers: [processo_importacao_service_1.ProcessoImportacaoService, periodo_letivo_service_1.PeriodoLetivoService],
        controllers: [processo_importacao_controller_1.ProcessoImportacaoController],
        exports: [processo_importacao_service_1.ProcessoImportacaoService],
    })
], ProcessoImportacaoModule);
//# sourceMappingURL=processo-importacao.module.js.map