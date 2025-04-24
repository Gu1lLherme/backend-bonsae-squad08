"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PastaModule = void 0;
const common_1 = require("@nestjs/common");
const pasta_service_1 = require("./pasta.service");
const pasta_controller_1 = require("./pasta.controller");
let PastaModule = class PastaModule {
};
exports.PastaModule = PastaModule;
exports.PastaModule = PastaModule = __decorate([
    (0, common_1.Module)({
        controllers: [pasta_controller_1.PastaController],
        providers: [pasta_service_1.PastaService],
    })
], PastaModule);
//# sourceMappingURL=pasta.module.js.map