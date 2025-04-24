"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePastaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pasta_dto_1 = require("./create-pasta.dto");
class UpdatePastaDto extends (0, mapped_types_1.PartialType)(create_pasta_dto_1.CreatePastaDto) {
}
exports.UpdatePastaDto = UpdatePastaDto;
//# sourceMappingURL=update-pasta.dto.js.map