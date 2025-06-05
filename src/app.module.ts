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
import { UsuarioModule } from './entities/usuario/usuarios.module'; // ajuste o path se necessário
import { ProcessoImportacaoModule } from '././processo-importacao/processo-importacao.module';



@Module({
  imports: [
    /*
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 3000, // ajuste a porta se necessário
      username: 'postgres',
      password: 'mat123',
      database: 'bancoteste1',
      entities: [__dirname + '*.entity{.ts,.js}'], // ajuste o path quando houver entidades
        
    }),*/

    TurmasModule,
    PeriodoLetivoModule,
    DisciplinaModule,
    TurmasModule,
    UsuarioModule,
    ProcessoImportacaoModule,
    
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('Mongo URI:', uri); // ✅ OK aqui!
        return { uri };
      },
    }),
    
    // Aqui você pode importar seus módulos

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
