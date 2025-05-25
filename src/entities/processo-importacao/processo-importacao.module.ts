import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessoImportacao, ProcessoImportacaoSchema } from './schemas/processo-importacao.schema';
import { ProcessoImportacaoService } from './processo-importacao.service';
import { ProcessoImportacaoController } from './processo-importacao.controller';
import { PeriodoLetivoModule } from '../periodo-letivo/periodo-letivo.module';
import { PeriodoLetivo } from '../periodo-letivo/entities/periodo-letivo.entity';
import { PeriodoLetivoService } from '../periodo-letivo/periodo-letivo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProcessoImportacao.name, schema: ProcessoImportacaoSchema },
    ]),
    PeriodoLetivoModule,
  ],
  providers: [ProcessoImportacaoService, PeriodoLetivoService],
  controllers: [ProcessoImportacaoController],
  exports: [ProcessoImportacaoService],  // exporta para outros módulos
})
export class ProcessoImportacaoModule {}