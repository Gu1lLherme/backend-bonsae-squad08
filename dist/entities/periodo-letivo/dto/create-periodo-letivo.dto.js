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
exports.CreatePeriodoLetivoDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let IsAfterStartDate = class IsAfterStartDate {
    validate(dataFinal, args) {
        const object = args.object;
        return object.dataInicial && dataFinal > object.dataInicial;
    }
    defaultMessage(args) {
        return 'A data final deve ser posterior à data inicial.';
    }
};
IsAfterStartDate = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isAfterStartDate', async: false })
], IsAfterStartDate);
class CreatePeriodoLetivoDto {
    codigoPeriodoLetivo;
    periodoLetivo;
    dataInicial;
    dataFinal;
}
exports.CreatePeriodoLetivoDto = CreatePeriodoLetivoDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'O código do período letivo deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O código do período letivo não pode ser vazio.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^\d{4}.\d{1}$/, { message: 'O código do período letivo deve seguir o formato "YYYY.N" (ex: 2025.1).', }),
    __metadata("design:type", String)
], CreatePeriodoLetivoDto.prototype, "codigoPeriodoLetivo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'O nome do período letivo deve ser uma string.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome do período letivo não pode ser vazio.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Length)(5, 50, { message: 'O nome do período letivo deve ter entre 5 e 50 caracteres.' }),
    (0, class_validator_1.Matches)(/^[A-Za-zÀ-ÿ0-9\s-().]+$/, { message: 'O nome do período letivo contém caracteres inválidos.', }),
    __metadata("design:type", String)
], CreatePeriodoLetivoDto.prototype, "periodoLetivo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data inicial não pode ser vazia.' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data final deve estar no formato YYYY-MM-DD.' }),
    __metadata("design:type", Date)
], CreatePeriodoLetivoDto.prototype, "dataInicial", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'A data final não pode ser vazia.' }),
    (0, class_validator_1.Validate)(IsAfterStartDate, {
        message: 'A data final deve ser posterior à data inicial.'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Matches)(/^\d{4}-\d{2}-\d{2}$/, { message: 'A data final deve estar no formato YYYY-MM-DD.' }),
    __metadata("design:type", Date)
], CreatePeriodoLetivoDto.prototype, "dataFinal", void 0);
//# sourceMappingURL=create-periodo-letivo.dto.js.map