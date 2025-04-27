import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that do not have decorators
    transform: true, //payloads are transformed to DTO instances
    forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are found
  }));
  await app.listen(process.env.PORT ?? 3000);
}


bootstrap();
