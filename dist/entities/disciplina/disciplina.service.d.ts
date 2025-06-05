import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { Model } from 'mongoose';
import { Disciplina, DisciplinaDocument } from './schemas/disciplina.schema';
import { CreateDisciplinaBatchDto } from './dto/create-disciplina-batch.dto';
import { ProcessoImportacaoService } from 'src/processo-importacao/processo-importacao.service';
export declare class DisciplinaService {
    private readonly disciplinaModel;
    private readonly processoImportacaoService;
    constructor(disciplinaModel: Model<DisciplinaDocument>, processoImportacaoService: ProcessoImportacaoService);
    create(createDisciplinaDto: CreateDisciplinaDto): Promise<Disciplina>;
    createBatch(dto: CreateDisciplinaBatchDto): Promise<any>;
    updateInvalidDisciplinas(id: string, updateDto: UpdateDisciplinaDto): Promise<any>;
}
