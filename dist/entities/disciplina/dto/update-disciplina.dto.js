"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDisciplinaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_disciplina_dto_1 = require("./create-disciplina.dto");
class UpdateDisciplinaDto extends (0, mapped_types_1.PartialType)(create_disciplina_dto_1.CreateDisciplinaDto) {
}
exports.UpdateDisciplinaDto = UpdateDisciplinaDto;
//# sourceMappingURL=update-disciplina.dto.js.map