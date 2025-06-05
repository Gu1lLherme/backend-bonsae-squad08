import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { Turma, TurmaSchema } from './schemas/turmas.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmaSQLEntity } from './entities/turma-sql.entity';
import { ProcessoImportacaoModule } from 'src/processo-importacao/processo-importacao.module';
//import { ProcessoImportacaoService } from '../processo-importacao/processo-importacao.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Turma.name, schema: TurmaSchema }]),
    forwardRef(() => ProcessoImportacaoModule),
    //TypeOrmModule.forFeature([TurmaSQLEntity]), // Habilita a injeção de repositórios da entidade
  ],
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService], // Exporta o serviço para outros módulos
})
export class TurmasModule {}
