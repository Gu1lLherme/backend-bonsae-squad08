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
exports.DisciplinaService = void 0;
const common_1 = require("@nestjs/common");
const create_disciplina_dto_1 = require("./dto/create-disciplina.dto");
const update_disciplina_dto_1 = require("./dto/update-disciplina.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const disciplina_schema_1 = require("./schemas/disciplina.schema");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const processo_importacao_service_1 = require("../../processo-importacao/processo-importacao.service");
const processo_importacao_schema_1 = require("../../processo-importacao/schemas/processo-importacao.schema");
let DisciplinaService = class DisciplinaService {
    disciplinaModel;
    processoImportacaoService;
    constructor(disciplinaModel, processoImportacaoService) {
        this.disciplinaModel = disciplinaModel;
        this.processoImportacaoService = processoImportacaoService;
    }
    async create(createDisciplinaDto) {
        const disciplinaExistente = await this.disciplinaModel.findOne({ codigoDisciplina: createDisciplinaDto.codigoDisciplina });
        if (disciplinaExistente) {
            throw new common_1.BadRequestException('A disciplina já existe.');
        }
        const novaDisciplina = new this.disciplinaModel(createDisciplinaDto);
        return novaDisciplina.save();
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
        const disciplinas = dto.disciplinas;
        const disciplinasComStatus = disciplinas.map((disciplina) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_disciplina_dto_1.CreateDisciplinaDto, disciplina);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...disciplina,
                processId: processId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.disciplinaModel.insertMany(disciplinasComStatus);
        await this.processoImportacaoService.marcarEtapaConcluida(processId, 'disciplinas');
        return {
            batchId: processId,
            disciplinas: disciplinasComStatus,
        };
    }
    async updateInvalidDisciplinas(id, updateDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('ID inválido.');
        }
        const instance = (0, class_transformer_1.plainToInstance)(update_disciplina_dto_1.UpdateDisciplinaDto, updateDto);
        const errors = (0, class_validator_1.validateSync)(instance);
        const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
        const valid = validationErrors.length === 0;
        const disciplina = await this.disciplinaModel.findByIdAndUpdate(id, {
            $set: { ...updateDto,
                valid,
                validationErrors, }
        }, { new: true });
        if (!disciplina) {
            throw new common_1.NotFoundException('Disciplina não encontrada.');
        }
        return {
            message: valid
                ? 'Disciplina atualizada e validada com sucesso.'
                : 'Disciplina atualizada, mas ainda contém erros de validação.',
            data: disciplina,
        };
    }
};
exports.DisciplinaService = DisciplinaService;
exports.DisciplinaService = DisciplinaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(disciplina_schema_1.Disciplina.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        processo_importacao_service_1.ProcessoImportacaoService])
], DisciplinaService);
//# sourceMappingURL=disciplina.service.js.map