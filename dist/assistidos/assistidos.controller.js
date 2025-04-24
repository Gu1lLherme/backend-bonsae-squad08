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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistidosController = void 0;
const common_1 = require("@nestjs/common");
const assistidos_service_1 = require("./assistidos.service");
const create_assistido_dto_1 = require("./dto/create-assistido.dto");
const update_assistido_dto_1 = require("./dto/update-assistido.dto");
let AssistidosController = class AssistidosController {
    assistidosService;
    constructor(assistidosService) {
        this.assistidosService = assistidosService;
    }
    create(createAssistidoDto) {
        return this.assistidosService.create(createAssistidoDto);
    }
    findAll() {
        return this.assistidosService.findAll();
    }
    findOne(id) {
        return this.assistidosService.findOne(+id);
    }
    update(id, updateAssistidoDto) {
        return this.assistidosService.update(+id, updateAssistidoDto);
    }
    remove(id) {
        return this.assistidosService.remove(+id);
    }
};
exports.AssistidosController = AssistidosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assistido_dto_1.CreateAssistidoDto]),
    __metadata("design:returntype", void 0)
], AssistidosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssistidosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssistidosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assistido_dto_1.UpdateAssistidoDto]),
    __metadata("design:returntype", void 0)
], AssistidosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssistidosController.prototype, "remove", null);
exports.AssistidosController = AssistidosController = __decorate([
    (0, common_1.Controller)('assistidos'),
    __metadata("design:paramtypes", [assistidos_service_1.AssistidosService])
], AssistidosController);
//# sourceMappingURL=assistidos.controller.js.map