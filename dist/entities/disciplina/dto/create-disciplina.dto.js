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
exports.CreateDisciplinaDto = exports.CategoriaDisciplina = void 0;
const class_validator_1 = require("class-validator");
var CategoriaDisciplina;
(function (CategoriaDisciplina) {
    CategoriaDisciplina["Curso"] = "Curso";
    CategoriaDisciplina["NPJ"] = "NPJ";
    CategoriaDisciplina["ProjetosExtensionistas"] = "Projetos Extensionistas";
    CategoriaDisciplina["TCC"] = "TCC";
})(CategoriaDisciplina || (exports.CategoriaDisciplina = CategoriaDisciplina = {}));
class CreateDisciplinaDto {
    periodoLetivo;
    disciplina;
    codigoDisciplina;
    dataInicial;
    dataFinal;
    categoria;
    periodoCurricular;
    estado;
    campos;
}
exports.CreateDisciplinaDto = CreateDisciplinaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Período Letivo é obrigatório.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "periodoLetivo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "disciplina", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Código da Disciplina é obrigatório.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data Inicial é obrigatória.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Data Inicial inválida.' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "dataInicial", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data Final é obrigatória.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Data Final inválida.' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "dataFinal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Categoria é obrigatória.' }),
    (0, class_validator_1.IsEnum)(CategoriaDisciplina, { message: 'Categoria inválida.' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "periodoCurricular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "campos", void 0);
//# sourceMappingURL=create-disciplina.dto.js.map