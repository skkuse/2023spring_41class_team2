import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async findUserById(@Param('userId') userId: string): Promise<User> {
        return this.usersService.findUserById(userId);
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Post()
    async createUser(@Body() userData: User): Promise<User> {
        return this.usersService.createUser(userData);
    }


}
