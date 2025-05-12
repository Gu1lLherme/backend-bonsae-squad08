import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { Turma, TurmaSchema } from './schemas/turmas.schema';
import { LoteImportacaoModule } from '../lote-importacao/lote-importacao.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Turma.name, schema: TurmaSchema }]),
    LoteImportacaoModule,
  ],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
