"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssistidoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_assistido_dto_1 = require("./create-assistido.dto");
class UpdateAssistidoDto extends (0, mapped_types_1.PartialType)(create_assistido_dto_1.CreateAssistidoDto) {
}
exports.UpdateAssistidoDto = UpdateAssistidoDto;
//# sourceMappingURL=update-assistido.dto.js.map