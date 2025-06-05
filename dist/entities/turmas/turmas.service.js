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
exports.TurmasService = void 0;
const common_1 = require("@nestjs/common");
const create_turma_dto_1 = require("./dto/create-turma.dto");
const update_turma_dto_1 = require("./dto/update-turma.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const turmas_schema_1 = require("./schemas/turmas.schema");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const processo_importacao_service_1 = require("../../processo-importacao/processo-importacao.service");
const processo_importacao_schema_1 = require("../../processo-importacao/schemas/processo-importacao.schema");
let TurmasService = class TurmasService {
    turmaModel;
    processoImportacaoService;
    constructor(turmaModel, processoImportacaoService) {
        this.turmaModel = turmaModel;
        this.processoImportacaoService = processoImportacaoService;
    }
    async create(createTurmaDto) {
        const turmaExistente = await this.turmaModel.findOne({ codigoTurma: createTurmaDto.codigoTurma });
        if (turmaExistente) {
            throw new common_1.BadRequestException('A turma já existe.');
        }
        const novaTurma = new this.turmaModel(createTurmaDto);
        return await novaTurma.save();
    }
    async findAll() {
        return this.turmaModel.find().populate('usuarios').exec();
    }
    async findOne(id) {
        const turma = await this.turmaModel.findById(id).populate('usuarios').exec();
        if (!turma) {
            throw new common_1.NotFoundException('Turma não encontrada.');
        }
        return turma;
    }
    async update(id, updateTurmaDto) {
        const updated = await this.turmaModel.findByIdAndUpdate(id, updateTurmaDto, { new: true });
        if (!updated) {
            throw new common_1.NotFoundException('Turma não encontrada para atualização.');
        }
        return updated;
    }
    async remove(id) {
        const turma = await this.turmaModel.findById(id);
        if (!turma) {
            throw new common_1.NotFoundException('Turma não encontrada para exclusão.');
        }
        await turma.deleteOne();
    }
    async createBatch(dto) {
        const processId = dto.processId;
        if (!processId) {
            throw new common_1.BadRequestException('processId é obrigatório');
        }
        const processo = await this.processoImportacaoService.getProcessoById(processId);
        if (processo.status !== processo_importacao_schema_1.StatusImportacao.EM_ANDAMENTO) {
            throw new common_1.BadRequestException('Processo não está em andamento');
        }
        if (processo.etapaAtual !== processo_importacao_schema_1.EtapaImportacao.PERIODOS) {
            throw new common_1.BadRequestException('Processo não está na etapa de PERIODOS');
        }
        const turmasComStatus = await Promise.all(dto.turmas.map(async (turma) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_turma_dto_1.CreateTurmaDto, turma);
            const dtoerrors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = dtoerrors.map((e) => Object.values(e.constraints || {}).join(', '));
            const allErrors = [...validationErrors];
            return {
                ...turma,
                processId: processId,
                valid: allErrors.length === 0,
                validationErrors: allErrors,
            };
        }));
        await this.turmaModel.insertMany(turmasComStatus);
        await this.processoImportacaoService.marcarEtapaConcluida(processId, 'turmas');
        return {
            batchId: processId,
            turmas: turmasComStatus,
        };
    }
    async updateInvalidTurmas(id, updateDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('ID inválido.');
        }
        const instance = (0, class_transformer_1.plainToInstance)(update_turma_dto_1.UpdateTurmaDto, updateDto);
        const errors = (0, class_validator_1.validateSync)(instance);
        const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
        const valid = validationErrors.length === 0;
        const turma = await this.turmaModel.findByIdAndUpdate(id, {
            $set: { ...updateDto,
                valid,
                validationErrors, }
        }, { new: true });
        if (!turma) {
            throw new common_1.NotFoundException('Turma não encontrada.');
        }
        return {
            message: 'Turma atualizada com sucesso!',
            data: turma,
        };
    }
};
exports.TurmasService = TurmasService;
exports.TurmasService = TurmasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(turmas_schema_1.Turma.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        processo_importacao_service_1.ProcessoImportacaoService])
], TurmasService);
//# sourceMappingURL=turmas.service.js.map