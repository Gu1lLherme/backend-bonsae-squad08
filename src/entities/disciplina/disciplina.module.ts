import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { Disciplina, DisciplinaSchema } from './schemas/disciplina.schema';
import { ProcessoImportacaoModule } from 'src/processo-importacao/processo-importacao.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disciplina.name, schema: DisciplinaSchema }]),
    forwardRef(() => ProcessoImportacaoModule),
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}