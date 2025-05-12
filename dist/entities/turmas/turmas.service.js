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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const turmas_schema_1 = require("./schemas/turmas.schema");
const uuid_1 = require("uuid");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let TurmasService = class TurmasService {
    turmaModel;
    connection;
    constructor(turmaModel, connection) {
        this.turmaModel = turmaModel;
        this.connection = connection;
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
    async bulkCreate(createTurmasDto) {
        if (!Array.isArray(createTurmasDto)) {
            throw new common_1.BadRequestException('Payload precisa ser um array de objetos Turma.');
        }
        if (createTurmasDto.length === 0) {
            throw new common_1.BadRequestException('A lista de turmas não pode ser vazia.');
        }
        const erros = [];
        const turmasValidas = createTurmasDto.filter((turma, index) => {
            const problemas = [];
            if (!turma.codigoDisciplina || turma.codigoDisciplina.trim() === '') {
                problemas.push('Código da disciplina é obrigatório.');
            }
            if (!turma.turno || !['Manhã', 'Tarde', 'Noite'].includes(turma.turno)) {
                problemas.push('Turno inválido. Deve ser Manhã, Tarde ou Noite.');
            }
            if (!turma.codigoTurma || turma.codigoTurma.trim() === '') {
                problemas.push('Código da turma é obrigatório.');
            }
            if (!turma.nomeTurma || turma.nomeTurma.trim() === '') {
                problemas.push('Nome da turma é obrigatório.');
            }
            if (!turma.tipo || !['aluno', 'professor'].includes(turma.tipo)) {
                problemas.push('Tipo inválido. Deve ser aluno ou professor.');
            }
            if (problemas.length > 0) {
                erros.push({ index, error: problemas.join(' | ') });
                return false;
            }
            return true;
        });
        if (turmasValidas.length === 0) {
            throw new common_1.BadRequestException({
                message: 'Nenhuma turma válida foi enviada.',
                erros,
            });
        }
        if (erros.length > 0) {
            console.warn('Algumas turmas foram rejeitadas:', erros);
        }
        const insertedTurmas = await this.turmaModel.insertMany(turmasValidas);
        return insertedTurmas.map(turma => turma.toObject());
    }
    async createBatch(turmas) {
        const batchId = (0, uuid_1.v4)();
        const turmasComStatus = turmas.map((turma) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_turma_dto_1.CreateTurmaDto, turma);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.map((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...turma,
                batchId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.turmaModel.insertMany(turmasComStatus);
        return {
            batchId,
            turmas: turmasComStatus,
        };
    }
};
exports.TurmasService = TurmasService;
exports.TurmasService = TurmasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(turmas_schema_1.Turma.name)),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], TurmasService);
//# sourceMappingURL=turmas.service.js.map