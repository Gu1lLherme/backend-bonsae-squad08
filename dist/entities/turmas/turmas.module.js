"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmasModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const turmas_service_1 = require("./turmas.service");
const turmas_controller_1 = require("./turmas.controller");
const turmas_schema_1 = require("./schemas/turmas.schema");
const processo_importacao_service_1 = require("../processo-importacao/processo-importacao.service");
let TurmasModule = class TurmasModule {
};
exports.TurmasModule = TurmasModule;
exports.TurmasModule = TurmasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: turmas_schema_1.Turma.name, schema: turmas_schema_1.TurmaSchema }]),
        ],
        controllers: [turmas_controller_1.TurmasController],
        providers: [turmas_service_1.TurmasService, processo_importacao_service_1.ProcessoImportacaoService],
    })
], TurmasModule);
//# sourceMappingURL=turmas.module.js.map