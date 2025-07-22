# method 3: add middleware-roles-with-jwt token

```
## swagger role middleware


  class SwaggerRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      if (!req.user?.role) {
        console.log("swagger middleware -- no user role")
        return res.status(401).json({
          statusCode: 401,
          message: 'Authentication required',
          error: 'Unauthorized'
        });
      }

```
## to run the app

```
npm run start:dev 
```

Using Postman to get the JWT token. 
```
http://127.0.0.1:3000/auth/login
```

- refer `userService` for the creds.

