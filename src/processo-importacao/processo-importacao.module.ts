import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessoImportacao, ProcessoImportacaoSchema } from './schemas/processo-importacao.schema';
import { ProcessoImportacaoService } from './processo-importacao.service';
import { ProcessoImportacaoController } from './processo-importacao.controller';

// Se PeriodoLetivoService for usado aqui, importe com forwardRef:
import { PeriodoLetivoModule } from "../entities/periodo-letivo/periodo-letivo.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessoImportacao.name, schema: ProcessoImportacaoSchema },
    ]),
    forwardRef(() => PeriodoLetivoModule), // caso haja dependência circular
  ],
  providers: [ProcessoImportacaoService],
  controllers: [ProcessoImportacaoController],
  exports: [ProcessoImportacaoService],
})
export class ProcessoImportacaoModule {}