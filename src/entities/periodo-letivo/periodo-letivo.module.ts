import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoLetivoService } from './periodo-letivo.service';
import { PeriodoLetivoController } from './periodo-letivo.controller';
import { PeriodoLetivo, PeriodoLetivoSchema } from './schemas/periodo-letivo.schema';
import { ProcessoImportacaoService } from '../processo-importacao/processo-importacao.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PeriodoLetivo.name, schema: PeriodoLetivoSchema }]),
  ],
  controllers: [PeriodoLetivoController],
  providers: [PeriodoLetivoService, ProcessoImportacaoService],
})
export class PeriodoLetivoModule {}
