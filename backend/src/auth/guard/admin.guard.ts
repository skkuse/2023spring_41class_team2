import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    if (!token) return false;

    let user: any;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return false;
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { userid: user.userid },
    });

    return dbUser && dbUser.isAdmin;
  }
}
