import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Leancontinuo\'s Backend')
    .setDescription('API for the Leancontinuo project')
    .setVersion('1.0')
    .build();

  const docFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, docFactory);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
