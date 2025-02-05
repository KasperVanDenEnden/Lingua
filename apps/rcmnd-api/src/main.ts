/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  const config = new DocumentBuilder()
    .setTitle('Lingua Data API')
    .setDescription('Lingua swagger documentation')
    .setVersion('1.0')
    .addTag('Lingua')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, documentFactory);

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3100;
  await app.listen(port);
  Logger.log(
    `🚀 Application rcmnd-api is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
