import { Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findUserById(userId: string): Promise<User> {
        return this.prisma.user.findUnique({
            where: {
                userid: userId,
            },
        });
    }

    async findAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async createUser(userData: User): Promise<User> {
        return this.prisma.user.create({
            data: userData
        });
    }
}
