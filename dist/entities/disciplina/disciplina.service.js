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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const disciplina_schema_1 = require("./schemas/disciplina.schema");
let DisciplinaService = class DisciplinaService {
    disciplinaModel;
    connection;
    constructor(disciplinaModel, connection) {
        this.disciplinaModel = disciplinaModel;
        this.connection = connection;
    }
    create(createDisciplinaDto) {
        const problemas = [];
        if (!createDisciplinaDto.codigoDisciplina)
            problemas.push('Código da disciplina é obrigatório.');
        if (!createDisciplinaDto.dataInicial || isNaN(Date.parse(createDisciplinaDto.dataInicial.toString())))
            problemas.push('Data inicial inválida.');
        if (!createDisciplinaDto.dataFinal || isNaN(Date.parse(createDisciplinaDto.dataFinal.toString())))
            problemas.push('Data final inválida.');
        if (!createDisciplinaDto.categoria)
            problemas.push('Categoria é obrigatória.');
        if (problemas.length > 0) {
            throw new common_1.BadRequestException(problemas.join(' | '));
        }
        return this.disciplinaModel.create(createDisciplinaDto);
    }
    async bulkCreate(createDisciplinasDto) {
        if (!Array.isArray(createDisciplinasDto) || createDisciplinasDto.length === 0) {
            throw new common_1.BadRequestException('Payload precisa ser uma lista de disciplinas.');
        }
        const erros = [];
        createDisciplinasDto.forEach((disciplina, index) => {
            const problemas = [];
            if (!disciplina.codigoDisciplina)
                problemas.push('Código da disciplina é obrigatório.');
            if (!disciplina.dataInicial || isNaN(Date.parse(disciplina.dataInicial.toString())))
                problemas.push('Data inicial inválida.');
            if (!disciplina.dataFinal || isNaN(Date.parse(disciplina.dataFinal.toString())))
                problemas.push('Data final inválida.');
            if (!disciplina.categoria)
                problemas.push('Categoria é obrigatória.');
            if (problemas.length > 0) {
                erros.push({ index, error: problemas.join(' | ') });
            }
        });
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Erros de validação nas disciplinas.',
                erros,
            });
        }
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const disciplinasCriadas = await this.disciplinaModel.insertMany(createDisciplinasDto, { session });
            await session.commitTransaction();
            session.endSession();
            return disciplinasCriadas;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error('Erro no bulkCreate de Disciplinas:', error);
            throw new common_1.InternalServerErrorException('Erro ao criar disciplinas em lote.');
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