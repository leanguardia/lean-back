import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: remove when proxy is implemented in the frontend
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      // Allowed origin patterns
      const allowedPatterns = [
        /^https?:\/\/localhost:(3000|3001)$/,                     // Local development
        /^https?:\/\/(.+\.)?leancontinuo\.com$/,                 // leancontinuo.com and all subdomains
        /^https?:\/\/.*\.vercel\.app$/,                          // All Vercel deployments
      ];

      const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    allowedHeaders: ['Content-Type', 'X-API-Key'],
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
