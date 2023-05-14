import { Controller, Get, Put, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

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
    async createUser(@Body() userData: CreateUserDto): Promise<any> {
        return this.usersService.createUser(userData);
    }

    //유저가 풀어본 문제들
    // @Get(':userId/solved')


    //유저의 해당 문제 풀이 상태 갱신
    // @Put(':userId/solved/:problemId')

    //문제 제출
    // @Post(':userId/solved/:problemId')

    //유저가 푼 문제의 채팅 로그
    // @Get(':userId/solved/:problemId/chat')


}
