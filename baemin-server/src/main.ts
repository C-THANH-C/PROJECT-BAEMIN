import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  await app.listen(8080);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

}
bootstrap();
