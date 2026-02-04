import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ // TODO: remove when proxy is implemented in the frontend
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  });

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
    .addApiKey(
      { type: 'apiKey', name: 'X-API-Key', in: 'header', description: 'API key for secured endpoints' },
      'api-key',
    )
    .build();

  const docFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, docFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
