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
const create_periodo_letivo_dto_1 = require("./dto/create-periodo-letivo.dto");
const update_periodo_letivo_dto_1 = require("./dto/update-periodo-letivo.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
const processo_importacao_schema_1 = require("../../processo-importacao/schemas/processo-importacao.schema");
const processo_importacao_service_1 = require("../../processo-importacao/processo-importacao.service");
let PeriodoLetivoService = class PeriodoLetivoService {
    periodoLetivoModel;
    processoImportacaoService;
    constructor(periodoLetivoModel, processoImportacaoService) {
        this.periodoLetivoModel = periodoLetivoModel;
        this.processoImportacaoService = processoImportacaoService;
    }
    async createBatch(dto) {
        const processId = dto.processId;
        const processo = await this.processoImportacaoService.getProcessoById(processId);
        if (processo.status !== processo_importacao_schema_1.StatusImportacao.EM_ANDAMENTO) {
            throw new common_1.BadRequestException('Processo não está em andamento');
        }
        if (processo.etapaAtual !== processo_importacao_schema_1.EtapaImportacao.PERIODOS) {
            throw new common_1.BadRequestException('Processo não está na etapa de PERIODOS');
        }
        const batchId = (0, uuid_1.v4)();
        const periodosLetivos = dto.periodos;
        const periodosComStatus = periodosLetivos.map((periodo) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_periodo_letivo_dto_1.CreatePeriodoLetivoDto, periodo);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.flatMap((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...periodo,
                processId: processId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.periodoLetivoModel.insertMany(periodosComStatus);
        await this.processoImportacaoService.marcarEtapaConcluida(processId, 'periodo-letivo');
        return {
            batchId: processId,
            periodos: periodosComStatus,
        };
    }
    async updateInvalidPeriodos(id, updateDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException("ID invalido");
        }
        const instance = (0, class_transformer_1.plainToInstance)(update_periodo_letivo_dto_1.UpdatePeriodoLetivoDto, updateDto);
        const errors = (0, class_validator_1.validateSync)(instance);
        const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
        const valid = validationErrors.length === 0;
        const periodo = await this.periodoLetivoModel.findByIdAndUpdate(id, {
            $set: {
                ...updateDto,
                valid,
                validationErrors,
            }
        }, { new: true });
        if (!periodo) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return {
            message: 'Usuario Atualizado com sucesso',
            date: periodo,
        };
    }
};
exports.PeriodoLetivoService = PeriodoLetivoService;
exports.PeriodoLetivoService = PeriodoLetivoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(periodo_letivo_schema_1.PeriodoLetivo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        processo_importacao_service_1.ProcessoImportacaoService])
], PeriodoLetivoService);
//# sourceMappingURL=periodo-letivo.service.js.map