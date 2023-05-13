import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findUserById(userId: string): Promise<User> {
        const user =  this.prisma.user.findUnique({
            where: {
                userid: userId,
            },
        });

        if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
        return user;
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        if (!users || users.length === 0 ) throw new NotFoundException('No users found');

        return users;
    }

    async createUser(userData: CreateUserDto): Promise<CreateUserDto> {
        return this.prisma.user.create({
            data: userData
        });
    }
}
