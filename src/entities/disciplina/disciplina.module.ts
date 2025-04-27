import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';
import { Disciplina, DisciplinaSchema } from './schemas/disciplina.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disciplina.name, schema: DisciplinaSchema }]),
  ],
  controllers: [DisciplinaController],
  providers: [DisciplinaService],
})
export class DisciplinaModule {}
