// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      password: '$2a$15$A8UZoPym1/RHc3wkLYEeB.yGH0wgdqa25c7OaY51ImPWWEVb.JjSm', // 'password' hashed
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      username: 'devops',
      email: 'devops@example.com',
      password: '$2a$15$A8UZoPym1/RHc3wkLYEeB.yGH0wgdqa25c7OaY51ImPWWEVb.JjSm', // 'password' hashed
      role: 'devops',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      username: 'user',
      email: 'user@example.com',
      password: '$2a$15$A8UZoPym1/RHc3wkLYEeB.yGH0wgdqa25c7OaY51ImPWWEVb.JjSm', // 'password' hashed
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      username: userData.username!,
      email: userData.email!,
      password: await this.hashPassword(userData.password!),
      role: userData.role || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }
}