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
exports.ImportDisciplinaDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_disciplina_dto_1 = require("./create-disciplina.dto");
class ImportDisciplinaDto {
    processID;
    disciplinas;
}
exports.ImportDisciplinaDto = ImportDisciplinaDto;
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'O ID do processo deve ser um UUID válido.' }),
    __metadata("design:type", String)
], ImportDisciplinaDto.prototype, "processID", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Deve haver pelo menos uma turma' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_disciplina_dto_1.CreateDisciplinaDto),
    __metadata("design:type", Array)
], ImportDisciplinaDto.prototype, "disciplinas", void 0);
//# sourceMappingURL=import-disciplina.dto.js.map