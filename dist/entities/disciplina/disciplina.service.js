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
const uuid_1 = require("uuid");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let DisciplinaService = class DisciplinaService {
    disciplinaModel;
    connection;
    constructor(disciplinaModel, connection) {
        this.disciplinaModel = disciplinaModel;
        this.connection = connection;
    }
    async create(createDisciplinaDto) {
        const disciplinaExistente = await this.disciplinaModel.findOne({ codigoDisciplina: createDisciplinaDto.codigoDisciplina });
        if (disciplinaExistente) {
            throw new common_1.BadRequestException('A disciplina já existe.');
        }
        const novaDisciplina = new this.disciplinaModel(createDisciplinaDto);
        return novaDisciplina.save();
    }
    async bulkCreate(createDisciplinasDto) {
        if (!Array.isArray(createDisciplinasDto) || createDisciplinasDto.length === 0) {
            throw new common_1.BadRequestException('Payload precisa ser uma lista de disciplinas.');
        }
        const erros = [];
        const disciplinasValidas = createDisciplinasDto.filter((disciplina, index) => {
            const problemas = [];
            if (typeof disciplina.codigoDisciplina !== 'string' || disciplina.codigoDisciplina.trim() === '') {
                problemas.push('Código da disciplina é obrigatório.');
            }
            if (!disciplina.dataInicial || isNaN(Date.parse(disciplina.dataInicial.toString())))
                problemas.push('Data inicial inválida.');
            if (!disciplina.dataFinal || isNaN(Date.parse(disciplina.dataFinal.toString())))
                problemas.push('Data final inválida.');
            if (!disciplina.categoria)
                problemas.push('Categoria é obrigatória.');
            if (problemas.length > 0) {
                erros.push({ index, error: problemas.join(' | ') });
                return false;
            }
            return true;
        });
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Erros de validação nas disciplinas.',
                erros,
            });
        }
        if (disciplinasValidas.length === 0) {
            throw new common_1.BadRequestException({
                message: 'Nenhuma disciplina válida foi enviada.',
                erros,
            });
        }
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Algumas disciplinas foram rejeitadas.',
                erros,
            });
        }
        const disciplinasSanitizadas = disciplinasValidas.map(d => ({
            ...d,
            codigoDisciplina: d.codigoDisciplina.trim(),
        }));
        try {
            const insertedDisciplinas = await this.disciplinaModel.insertMany(disciplinasSanitizadas);
            return insertedDisciplinas.map(d => d.toObject());
        }
        catch (error) {
            console.error('Erro ao inserir disciplinas em lote:', error);
            throw new common_1.InternalServerErrorException('Erro ao salvar disciplinas.');
        }
    }
    findAll() {
        return `This action returns all disciplina`;
    }
    findOne(id) {
        return `This action returns a #${id} disciplina`;
    }
    update(id, updateDisciplinaDto) {
        return `This action updates a #${id} disciplina`;
    }
    remove(id) {
        return `This action removes a #${id} disciplina`;
    }
    async createBatch(dto) {
        const batchId = (0, uuid_1.v4)();
        const disciplinas = dto.disciplinas;
        const disciplinasComStatus = disciplinas.map((disciplina) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_disciplina_dto_1.CreateDisciplinaDto, disciplina);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...disciplina,
                batchId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.disciplinaModel.insertMany(disciplinasComStatus);
        return {
            batchId,
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
            throw new common_1.BadRequestException('Disciplina não encontrada.');
        }
        return {
            message: 'Disciplina atualizada com sucesso!',
            data: disciplina,
        };
    }
};
exports.DisciplinaService = DisciplinaService;
exports.DisciplinaService = DisciplinaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(disciplina_schema_1.Disciplina.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], DisciplinaService);
//# sourceMappingURL=disciplina.service.js.map