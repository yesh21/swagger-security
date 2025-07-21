# method 1: add express-basic-auth

```
## main.ts


    app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        'usr': 'secret',  // please import them from env
      },
    }),
  );

```