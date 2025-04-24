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
exports.UsuarioSchema = exports.Usuario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Usuario = class Usuario {
    nome;
    email;
    matricula;
    tipo;
    curso;
    departamento;
    turmas;
};
exports.Usuario = Usuario;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "matricula", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['aluno', 'professor'] }),
    __metadata("design:type", String)
], Usuario.prototype, "tipo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "curso", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Usuario.prototype, "departamento", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'Turma' }] }),
    __metadata("design:type", Array)
], Usuario.prototype, "turmas", void 0);
exports.Usuario = Usuario = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Usuario);
exports.UsuarioSchema = mongoose_1.SchemaFactory.createForClass(Usuario);
//# sourceMappingURL=usuario.schema.js.map