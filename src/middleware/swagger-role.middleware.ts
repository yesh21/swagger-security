// src/middleware/swagger-role.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function createSwaggerRoleMiddleware(allowedRoles: string[]) {
  @Injectable()
  class SwaggerRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      if (!req.user?.role) {
        console.log("swagger middleware -- no role")
        return res.status(401).json({
          statusCode: 401,
          message: 'Authentication required',
          error: 'Unauthorized'
        });
      }

      // Check if user's role is in the allowed roles
      if (allowedRoles.includes(req.user.role)) {
        console.log("allowed user included")
        return next();
      }
      console.log("swagger middleware")
      // User doesn't have required role
      return res.status(403).json({
        statusCode: 403,
        message: `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        error: 'Forbidden'
      });
    }
  }
  
  return SwaggerRoleMiddleware;
}

