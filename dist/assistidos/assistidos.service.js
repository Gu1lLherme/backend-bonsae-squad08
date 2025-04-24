"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistidosService = void 0;
const common_1 = require("@nestjs/common");
let AssistidosService = class AssistidosService {
    create(createAssistidoDto) {
        return 'This action adds a new assistido';
    }
    findAll() {
        return `This action returns all assistidos`;
    }
    findOne(id) {
        return `This action returns a #${id} assistido`;
    }
    update(id, updateAssistidoDto) {
        return `This action updates a #${id} assistido`;
    }
    remove(id) {
        return `This action removes a #${id} assistido`;
    }
};
exports.AssistidosService = AssistidosService;
exports.AssistidosService = AssistidosService = __decorate([
    (0, common_1.Injectable)()
], AssistidosService);
//# sourceMappingURL=assistidos.service.js.map