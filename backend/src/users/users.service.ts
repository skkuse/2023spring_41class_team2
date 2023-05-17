import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        userid: userId,
      },
    });

    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    if (!users || users.length === 0)
      throw new NotFoundException('No users found');

    return users;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    // return this.prisma.user.create({
    //     data: userData
    // });
    try {
      return await this.prisma.user.create({
        data: userData,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log('There is a unique constraint violation');
        }
      }
      //throw e
    }
  }
}
