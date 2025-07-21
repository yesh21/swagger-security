# method 2: add disabled swagger in production

```
## main.ts


  if (process.env.NODE_ENV !== 'production') {
    console.log("working on " + process.env.NODE_ENV)
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

```
