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
exports.CreateTurmaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateTurmaDto {
    codigoDisciplina;
    turno;
    codigoTurma;
    nomeTurma;
    tipo;
    usuarios;
}
exports.CreateTurmaDto = CreateTurmaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O código da disciplina é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O código da disciplina deve ser uma string.' }),
    (0, class_validator_1.Length)(3, 50),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "codigoDisciplina", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O turno é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O turno deve ser uma string.' }),
    (0, class_validator_1.IsEnum)(['Manhã', 'Tarde', 'Noite'], { message: 'O turno deve ser Manhã, Tarde ou Noite.', }),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "turno", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O código da turma é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O código da turma deve ser uma string.' }),
    (0, class_validator_1.Matches)(/^[A-Za=z0-9_-]+$/, { message: 'O código da turma deve conter apenas letras e números, hífen ou underscore.' }),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "codigoTurma", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome da turma é obrigatório.' }),
    (0, class_validator_1.IsString)({ message: 'O nome da turma deve ser uma string.' }),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "nomeTurma", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'O tipo é obrigatório.' }),
    (0, class_validator_1.IsEnum)(['aluno', 'professor'], { message: 'O tipo deve ser aluno ou professor.', }),
    __metadata("design:type", String)
], CreateTurmaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Usuários deve ser uma lista.' }),
    (0, class_validator_1.IsMongoId)({ each: true, message: 'Cada usuário deve ter um ID válido.' }),
    __metadata("design:type", Array)
], CreateTurmaDto.prototype, "usuarios", void 0);
//# sourceMappingURL=create-turma.dto.js.map