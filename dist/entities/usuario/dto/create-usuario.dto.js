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
exports.CreateUsuarioDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateUsuarioDto {
    perfil;
    subperfil;
    nome;
    numeroOab;
    seccionalOab;
    email;
    matriculaIes;
    telefone;
    cpf;
    senha;
    periodoCurricular;
    observacoes;
}
exports.CreateUsuarioDto = CreateUsuarioDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['Advogado(a)', 'Coordenador(a)', 'Professor(a)', 'Estagiário(a)', 'Aluno(a)', 'Secretário(a)'], { message: 'O perfil deve ser um dos seguintes: Advogado(a), Coordenador(a), Professor(a), Estagiário(a), Aluno(a), Secretário(a).' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "perfil", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O subperfil deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "subperfil", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'O nome deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Length)(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O sobrenome deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^[0-9]{1,6}$/, { message: 'Número da OAB inválido. Use até 6 dígitos.', }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "numeroOab", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A seccional da OAB deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^[A-Z]{2}$/, { message: 'Seccional inválida. Use a sigla do estado (ex: SE, SP).', }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "seccionalOab", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'O e-mail deve ser um endereço de e-mail válido.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'O nome de usuário deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9_-]$/, { message: 'Matrícula inválida. Use letras, números, hífen ou underscore (mínimo 4 caracteres).', }),
    (0, class_validator_1.Length)(4, 20, { message: 'A matrícula deve ter entre 4 e 20 caracteres.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "matriculaIes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^\d{2} \d{4,5}-\d{4}$/, { message: 'O telefone deve estar no formato (XX) XXXXX-XXXX. ou similar' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "telefone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'O CPF deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    (0, class_validator_1.Matches)(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato XXX.XXX.XXX-XX.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "cpf", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'A senha deve ser uma string.' }),
    (0, class_validator_1.Length)(6, 64, { message: 'A senha deve ter entre 6 e 64 caracteres.' }),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "senha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O campus deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "periodoCurricular", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O campus deve ser uma string.' }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "observacoes", void 0);
//# sourceMappingURL=create-usuario.dto.js.map