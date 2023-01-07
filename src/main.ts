import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from './common/env.service';
import { HttpExceptionFilter } from './common/Exception-Filters/http-exception.filter';
import { ModelExceptionFilter } from './common/Exception-Filters/model-exception.filter';
import * as fs from 'fs';
const path = require('path');

async function bootstrap() {
  const env = new EnvService().read();
  // const httpsOptions = {
  //   key: fs.readFileSync(path.resolve(__dirname, '../secrets/key.pem'), 'utf8'),
  //   cert: fs.readFileSync(path.resolve(__dirname, './secrets/cert.pem'), 'utf8')
  // }
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter(), new ModelExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(env.APP_NAME || 'Quick NestJs Boilerplate for REST Service')
    .setDescription(env.APP_DESC || 'The Quickproject')
    .setVersion(env.APP_VER || '1.0')
    .addTag(env.APP_TAG || 'my project')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start HTTP request - response
  await app.listen(env.APP_PORT);
  const app_url = await app.getUrl();
  
  console.log(`Application is running on: ${app_url}`);
  console.log(`Swagger Docs path: ${app_url}/api`);
}
bootstrap();
