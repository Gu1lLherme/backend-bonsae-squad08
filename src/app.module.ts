// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoLetivoModule } from './entities/periodo-letivo/periodo-letivo.module';
import { DisciplinaModule } from './entities/disciplina/disciplina.module';
import { TurmasModule } from './entities/turmas/turmas.module';
import { UsuariosModule } from './entities/usuario/usuarios.module'; // ajuste o path se necessário


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('Mongo URI:', uri); // ✅ OK aqui!
        return { uri };
      },
    }),
    PeriodoLetivoModule,
    DisciplinaModule,
    TurmasModule,
    UsuariosModule
    // Aqui você pode importar seus módulos

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
