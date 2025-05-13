import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { Turma, TurmaSchema } from './schemas/turmas.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaSQLEntity } from './entities/turma-sql.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Turma.name, schema: TurmaSchema }]),
    //TypeOrmModule.forFeature([TurmaSQLEntity]), // Habilita a injeção de repositórios da entidade
  ],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
