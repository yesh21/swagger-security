import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
      app.use(['/docs', '/docs-json'], (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/' || req.path === '') {
    if (req.query.secret !== 'abrakadabra-useinenvfiles') {
      return res.redirect('/');
    }
  }
  next();
});
    const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('description') 
    .setVersion('1.0') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
