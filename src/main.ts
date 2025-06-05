import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'src/processo-importacao/schemas/processo-importacao.schema';

async function bootstrap() {
  console.log(' Bootstrap iniciado');
  const app = await NestFactory.create(AppModule);
  console.log(' AppModule carregado');

  /*app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });*/

  await app.listen(process.env.PORT ?? 8080);
}


bootstrap();
