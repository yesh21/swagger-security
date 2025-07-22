# method 4: add secret query parameter in swagger API

```
## secret parameter


  const app = await NestFactory.create(AppModule);
      app.use('/docs', (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/' || req.path === '') {
    if (req.query.secret !== 'abrakadabra-useinenvfiles') {
      return res.redirect('/');
    }
  }
  next();
});
```
## to run the app

```
npm run start:dev 
```

Use it like this to access the Swagger UI 
```
http://localhost:3000/docs?secret=abrakadabra-useinenvfiles
```

- your /docs/* assets is not completely protected, just be careful of that.
