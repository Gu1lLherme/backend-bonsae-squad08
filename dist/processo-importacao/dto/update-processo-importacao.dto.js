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
exports.UpdateProcessoImportacaoDto = exports.ProcessoStatus = void 0;
const class_validator_1 = require("class-validator");
const processo_importacao_schema_1 = require("../schemas/processo-importacao.schema");
var ProcessoStatus;
(function (ProcessoStatus) {
    ProcessoStatus["EM_ANDAMENTO"] = "EM_ANDAMENTO";
    ProcessoStatus["CONCLUIDO"] = "CONCLUIDO";
    ProcessoStatus["ERRO"] = "ERRO";
})(ProcessoStatus || (exports.ProcessoStatus = ProcessoStatus = {}));
class UpdateProcessoImportacaoDto {
    processId;
    etapaAtual;
    status;
    totalRegistros;
    erros;
}
exports.UpdateProcessoImportacaoDto = UpdateProcessoImportacaoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateProcessoImportacaoDto.prototype, "processId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(processo_importacao_schema_1.EtapaImportacao),
    __metadata("design:type", String)
], UpdateProcessoImportacaoDto.prototype, "etapaAtual", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(processo_importacao_schema_1.StatusImportacao),
    __metadata("design:type", String)
], UpdateProcessoImportacaoDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateProcessoImportacaoDto.prototype, "totalRegistros", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProcessoImportacaoDto.prototype, "erros", void 0);
//# sourceMappingURL=update-processo-importacao.dto.js.map