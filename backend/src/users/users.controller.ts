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
}
