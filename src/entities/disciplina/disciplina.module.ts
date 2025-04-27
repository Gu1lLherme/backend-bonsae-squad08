import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinaService } from './disciplina.service';
import { DisciplinaController } from './disciplina.controller';
import { Disciplina, DisciplinaSchema } from './schemas/disciplina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disciplina.name, schema: DisciplinaSchema }]),
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}