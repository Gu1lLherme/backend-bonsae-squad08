import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessoImportacao, ProcessoImportacaoSchema } from './schemas/processo-importacao.schema';
import { ProcessoImportacaoService } from './processo-importacao.service';
import { ProcessoImportacaoController } from './processo-importacao.controller';
import { PeriodoLetivoModule } from '../entities/periodo-letivo/periodo-letivo.module';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessoImportacao.name, schema: ProcessoImportacaoSchema },
    ]),
    PeriodoLetivoModule,  // Importa o módulo PeriodoLetivoModule
  ],
  providers: [ProcessoImportacaoService],
  controllers: [ProcessoImportacaoController],
  exports: [ProcessoImportacaoService],  // exporta para outros módulos
})
export class ProcessoImportacaoModule {}