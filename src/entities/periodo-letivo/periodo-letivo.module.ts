import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { PeriodoLetivo, PeriodoLetivoSchema } from './schemas/periodo-letivo.schema';
import { ProcessoImportacaoService } from '../processo-importacao/processo-importacao.service';
import { ProcessoImportacaoModule } from '../processo-importacao/processo-importacao.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PeriodoLetivo.name, schema: PeriodoLetivoSchema }]),
    ProcessoImportacaoModule,
  ],
  controllers: [PeriodoLetivoController],
  providers: [PeriodoLetivoService],
})
export class PeriodoLetivoModule {}
