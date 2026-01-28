import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Lean\'s Backend')
    .setDescription('API services for leancontinuo.com')
    .setVersion('1.0')
    .build();

  const docFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, docFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
