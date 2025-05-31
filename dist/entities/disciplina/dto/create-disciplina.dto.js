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
exports.CreateDisciplinaDto = exports.IsAfterStartDate = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let IsAfterStartDate = class IsAfterStartDate {
    validate(dataFinal, args) {
        const obj = args.object;
        if (!obj.dataInicial || !dataFinal)
            return true;
        return new Date(dataFinal) > new Date(obj.dataInicial);
    }
    defaultMessage(args) {
        return 'A data final deve ser posterior à data inicial.';
    }
};
exports.IsAfterStartDate = IsAfterStartDate;
exports.IsAfterStartDate = IsAfterStartDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isAfterStartDate', async: false })
], IsAfterStartDate);
class CreateDisciplinaDto {
    periodoLetivo;
    disciplina;
    codigoDisciplina;
    dataInicial;
    dataFinal;
    categoria;
    periodoCurricular;
    estado;
    campus;
}
exports.CreateDisciplinaDto = CreateDisciplinaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Período Letivo é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'Período Letivo deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "periodoLetivo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Disciplina é obrigatória.' }),
    (0, class_validator_1.IsString)({ message: 'Disciplina deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Length)(3, 100, { message: 'Disciplina deve ter entre 3 e 100 caracteres.' }),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, { message: 'O nome da disciplina contém caracteres inválidos.', }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "disciplina", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Código da Disciplina é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'Código da Disciplina deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^[A-Z0-9._-]$/, { message: 'Código da Disciplina deve conter apenas letras maiúsculas, números, ponto, hífen ou underscore.' }),
    (0, class_validator_1.Length)(3, 20, { message: 'Código da Disciplina deve ter entre 3 e 20 caracteres.' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data Inicial é obrigatória.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Data Inicial inválida.' }),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "dataInicial", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Data Final é obrigatória.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Data Final inválida.' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Validate)(IsAfterStartDate),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "dataFinal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Categoria é obrigatória.' }),
    (0, class_validator_1.IsEnum)(["Curso", "TCC", "NPJ", "Projetos Extencionistas"], { message: 'Categoria inválida, a categoria deve se enquadrar em: "Curso","TCC","NPJ","Projetos Extencionistas"' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'PeriodoCurricular deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "periodoCurricular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['Ativo', 'Inativo'], { message: 'Estado deve ser Ativo ou Inativo.' }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Campus deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, { message: 'O nome do campus contém caracteres inválidos.', }),
    __metadata("design:type", String)
], CreateDisciplinaDto.prototype, "campus", void 0);
//# sourceMappingURL=create-disciplina.dto.js.map