// File: src/swagger/swagger.controller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../app.module';

@Controller('docs')
export class SwaggerController {
  private swaggerDocument: any;

  constructor() {
    // Create the swagger config once
    const config = new DocumentBuilder()
      .setTitle('My API')
      .setDescription('API Description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    
    // We'll create the document in the route handlers since we need the app instance
  }

  @Get()
  async getSwaggerUI(@Req() req: Request, @Res() res: Response) {
    try {
      // Get the NestJS app from the HTTP adapter
      const nestApp = req.app.get('__nestjs__');
      
      if (!nestApp) {
        return res.status(500).send('NestJS app not found');
      }

      const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(nestApp, config);
      
      // Generate proper Swagger UI HTML
      const swaggerUiAssetPath = 'https://unpkg.com/swagger-ui-dist@5.17.14';
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>API Documentation</title>
  <link rel="stylesheet" href="${swaggerUiAssetPath}/swagger-ui.css" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="${swaggerUiAssetPath}/swagger-ui-bundle.js" crossorigin></script>
<script src="${swaggerUiAssetPath}/swagger-ui-standalone-preset.js" crossorigin></script>
<script>
  window.onload = () => {
    window.ui = SwaggerUIBundle({
      url: '/docs/json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });
  };
</script>
</body>
</html>`;
      
      res.type('text/html').send(html);
    } catch (error) {
      console.error('Swagger UI error:', error);
      res.status(500).send('Error generating Swagger UI');
    }
  }

  @Get('json')
  async getSwaggerJson(@Req() req: Request, @Res() res: Response) {
    try {
      // Get the NestJS app from the HTTP adapter
      const nestApp = req.app.get('__nestjs__');
      
      if (!nestApp) {
        return res.status(500).json({ error: 'NestJS app not found' });
      }

      const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API Description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

      const document = SwaggerModule.createDocument(nestApp, config);
      
      res.json(document);
    } catch (error) {
      console.error('Swagger JSON error:', error);
      res.status(500).json({ error: 'Error generating Swagger JSON' });
    }
  }
}