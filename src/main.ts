import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('description') 
    .setVersion('1.0') 
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'x-docs-key' },
      'DocsKey' // This name will be used in @ApiSecurity()
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
