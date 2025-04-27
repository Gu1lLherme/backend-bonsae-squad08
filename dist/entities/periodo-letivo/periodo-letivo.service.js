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
exports.PeriodoLetivoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const periodo_letivo_schema_1 = require("./schemas/periodo-letivo.schema");
let PeriodoLetivoService = class PeriodoLetivoService {
    periodoLetivoModel;
    constructor(periodoLetivoModel) {
        this.periodoLetivoModel = periodoLetivoModel;
    }
    async create(createPeriodoLetivoDto) {
        const periodoExistente = await this.periodoLetivoModel.findOne({ codigoPeriodoLetivo: createPeriodoLetivoDto.codigoPeriodoLetivo });
        if (periodoExistente) {
            throw new common_1.BadRequestException('Código de período letivo já existente.');
        }
        if (new Date(createPeriodoLetivoDto.dataInicial) >= new Date(createPeriodoLetivoDto.dataFinal)) {
            throw new common_1.BadRequestException('Data inicial deve ser anterior à data final.');
        }
        const created = new this.periodoLetivoModel(createPeriodoLetivoDto);
        return created.save();
    }
    async findAll() {
        return this.periodoLetivoModel.find().exec();
    }
    async findOne(id) {
        const periodo = await this.periodoLetivoModel.findById(id);
        if (!periodo)
            throw new common_1.NotFoundException('Período letivo não encontrado.');
        return periodo;
    }
    async update(id, updatePeriodoLetivoDto) {
        const periodoAtualizado = await this.periodoLetivoModel.findByIdAndUpdate(id, updatePeriodoLetivoDto, { new: true });
        if (!periodoAtualizado)
            throw new common_1.NotFoundException('Período letivo não encontrado.');
        return periodoAtualizado;
    }
    async remove(id) {
        const result = await this.periodoLetivoModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Período letivo não encontrado.');
    }
};
exports.PeriodoLetivoService = PeriodoLetivoService;
exports.PeriodoLetivoService = PeriodoLetivoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(periodo_letivo_schema_1.PeriodoLetivo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PeriodoLetivoService);
//# sourceMappingURL=periodo-letivo.service.js.map