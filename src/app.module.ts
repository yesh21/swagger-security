// src/app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { createSwaggerRoleMiddleware } from './middleware/swagger-role.middleware';
import { BooksModule } from './books/books.module';
import { SwaggerModule } from './swagger/swagger.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    BooksModule,
    SwaggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'auth/login', method: RequestMethod.ALL })
      .forRoutes('*');
    consumer
      .apply(createSwaggerRoleMiddleware(['admin', 'devops']))
      .exclude({ path: 'auth/login', method: RequestMethod.ALL })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

