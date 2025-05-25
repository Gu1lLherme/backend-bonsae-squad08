"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodoLetivoModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const periodo_letivo_service_1 = require("./periodo-letivo.service");
const periodo_letivo_controller_1 = require("./periodo-letivo.controller");
const periodo_letivo_schema_1 = require("./schemas/periodo-letivo.schema");
const processo_importacao_module_1 = require("../processo-importacao/processo-importacao.module");
let PeriodoLetivoModule = class PeriodoLetivoModule {
};
exports.PeriodoLetivoModule = PeriodoLetivoModule;
exports.PeriodoLetivoModule = PeriodoLetivoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: periodo_letivo_schema_1.PeriodoLetivo.name, schema: periodo_letivo_schema_1.PeriodoLetivoSchema }]),
            processo_importacao_module_1.ProcessoImportacaoModule,
        ],
        controllers: [periodo_letivo_controller_1.PeriodoLetivoController],
        providers: [periodo_letivo_service_1.PeriodoLetivoService],
        exports: [periodo_letivo_service_1.PeriodoLetivoService],
    })
], PeriodoLetivoModule);
//# sourceMappingURL=periodo-letivo.module.js.map