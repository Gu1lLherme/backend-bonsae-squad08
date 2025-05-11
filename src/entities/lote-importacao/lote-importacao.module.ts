import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoteImportacao, LoteImportacaoSchema } from './schemas/lote-importacao.schema';
import { LoteImportacaoService } from './lote-importacao.service';
import { LoteImportacaoController } from './lote-importacao.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LoteImportacao.name, schema: LoteImportacaoSchema }]),
  ],
  providers: [LoteImportacaoService],
  exports: [LoteImportacaoService],
  controllers: [LoteImportacaoController]
})
export class LoteImportacaoModule {}
