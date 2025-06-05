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
exports.ImportUsuarioDto = void 0;
const create_usuario_dto_1 = require("./create-usuario.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ImportUsuarioDto {
    processID;
    usuarios;
}
exports.ImportUsuarioDto = ImportUsuarioDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'O ID do processo deve ser um UUID válido.' }),
    __metadata("design:type", String)
], ImportUsuarioDto.prototype, "processID", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Deve haver pelo menos um usuário.' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_usuario_dto_1.CreateUsuarioDto),
    __metadata("design:type", Array)
], ImportUsuarioDto.prototype, "usuarios", void 0);
//# sourceMappingURL=import-usuario.dto.js.map