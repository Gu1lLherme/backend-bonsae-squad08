// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';


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
    // Conexão com MySQL
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // Tipo de banco
        host: configService.get<string>('MYSQL_HOST'), // Host do MySQL
        port: configService.get<number>('MYSQL_PORT'), // Porta do MySQL
        username: configService.get<string>('MYSQL_USER'), // Usuário do MySQL
        password: configService.get<string>('MYSQL_PASSWORD'), // Senha do MySQL
        database: configService.get<string>('MYSQL_DATABASE'), // Nome do banco
        autoLoadEntities: true, // Carregar entidades automaticamente
        synchronize: true, // Sincronizar automaticamente as tabelas (ideal para desenvolvimento)
      }),
      inject: [ConfigService], // Injeta o ConfigService para acessar as variáveis
    }),
    PeriodoLetivoModule,
    // Aqui você pode importar seus módulos
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
