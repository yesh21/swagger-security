import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    
    // If no token, continue without setting user (let role middleware handle it)
    if (!token) {
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      });

      // Fetch user details including role
      const user = await this.usersService.findById(payload.sub);
      if (user) {
        req.user = {
           //...user,
          userId: payload.sub,
          username: payload.username,
          email: payload.email,
          role: user.role,
         
        };
      }
      console.log(req.user)
    } catch (error) {
      // Token is invalid, but let the role middleware handle the response
      console.warn('Invalid token:', error.message);
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log("No token")
    return type === 'Bearer' ? token : undefined;
  }
}
