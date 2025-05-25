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
const update_periodo_letivo_dto_1 = require("./dto/update-periodo-letivo.dto");
const create_periodo_letivo_batch_dto_1 = require("./dto/create-periodo-letivo-batch.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
let PeriodoLetivoService = class PeriodoLetivoService {
    periodoLetivoModel;
    connection;
    constructor(periodoLetivoModel, connection) {
        this.periodoLetivoModel = periodoLetivoModel;
        this.connection = connection;
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
    async bulkCreate(createPeriodosDto) {
        if (!Array.isArray(createPeriodosDto)) {
            throw new common_1.BadRequestException('Payload precisa ser um array de objetos Periodo Letivo.');
        }
        if (createPeriodosDto.length === 0) {
            throw new common_1.BadRequestException('A lista de períodos letivos não pode ser vazia.');
        }
        const erros = [];
        const periodosValidados = createPeriodosDto.filter((periodo, index) => {
            const problemas = [];
            if (!periodo.codigoPeriodoLetivo || periodo.codigoPeriodoLetivo.trim() === '') {
                problemas.push('Código do período letivo é obrigatório.');
            }
            if (!periodo.periodosLetivos || periodo.periodosLetivos.trim() === '') {
                problemas.push('Nome do período letivo é obrigatório.');
            }
            if (!periodo.dataInicial || isNaN(Date.parse(periodo.dataInicial.toString()))) {
                problemas.push('Data inicial inválida ou ausente.');
            }
            if (!periodo.dataFinal || isNaN(Date.parse(periodo.dataFinal.toString()))) {
                problemas.push('Data final inválida ou ausente.');
            }
            if (new Date(periodo.dataInicial) > new Date(periodo.dataFinal)) {
                problemas.push('Data inicial não pode ser posterior à data final.');
            }
            if (problemas.length > 0) {
                erros.push({ index, error: problemas.join(' | ') });
            }
        });
        if (erros.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Alguns registros de períodos letivos são inválidos.',
                erros,
            });
        }
        const periodosInseridos = await this.periodoLetivoModel.insertMany(periodosValidados);
        return periodosInseridos.map((periodo) => periodo.toObject());
    }
    async bulkCreateWithTransaction(createPeriodosDto) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const periodosCriados = await this.periodoLetivoModel.insertMany(createPeriodosDto, { session });
            await session.commitTransaction();
            session.endSession();
            return periodosCriados;
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw new common_1.InternalServerErrorException('Erro ao criar períodos letivos em lote.', error.message);
        }
    }
    async createBatch(dto) {
        const batchId = dto.processId || (0, uuid_1.v4)();
        const periodosLetivos = dto.periodos;
        const periodosComStatus = periodosLetivos.map((periodo) => {
            const instance = (0, class_transformer_1.plainToInstance)(create_periodo_letivo_batch_dto_1.CreatePeriodoLetivoBatchDto, periodo);
            const errors = (0, class_validator_1.validateSync)(instance);
            const validationErrors = errors.flatMap((e) => Object.values(e.constraints || {}).join(', '));
            return {
                ...periodosLetivos,
                batchId,
                valid: validationErrors.length === 0,
                validationErrors,
            };
        });
        await this.periodoLetivoModel.insertMany(periodosComStatus);
        return {
            batchId,
            periodosLetivos: periodosComStatus,
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
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model, mongoose_2.Connection])
], PeriodoLetivoService);
//# sourceMappingURL=periodo-letivo.service.js.map