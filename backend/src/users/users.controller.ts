import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminGuard } from 'src/auth/guard/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Post()
  createUser(@Body() userData: CreateUserDto): Promise<any> {
    return this.usersService.createUser(userData);
  }

  @Get(':userId')
  findUserById(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findUserById(userId);
  }

  //유저 밴
  @UseGuards(AdminGuard)
  @Patch(':userId')
  banUser(@Param('userId') userId: string): Promise<any> {
    return this.usersService.banUser(userId);
  }

  // 유저 정지 기능 삭제 고민중
  // 기능 구현 시 suspend_date 추가해서 db 수정 필요
  // 이 기능을 구현하면 밴 기능 지워도됨

  //유저가 풀어본 문제들
  @Get(':userId/solved')
  getAllSolvedProblems(@Param('userId') userId: string): Promise<any> {
    return this.usersService.getAllSolvedProblems(userId);
  }

  //유저의 해당 문제 풀이 상태 갱신
  @Patch(':userId/solved/:problemId')
  updateSolvedStatus(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
    @Body() data: any,
  ): Promise<any> {
    return this.usersService.updateSolvedStatus(userId, problemId, data);
  }

  //문제 제출
  @Post(':userId/solved/:problemId')
  createProblemStatus(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
    @Body() data: any,
  ): Promise<any> {
    return this.usersService.createProblemStatus(userId, problemId, data);
  }

  //유저가 푼 문제의 채팅 로그
  @Get(':userId/solved/:problemId/chat')
  getChatLog(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
  ): Promise<any> {
    return this.usersService.getChatLog(userId, problemId);
  }

  //채팅 로그 추가
  // 발언자가 누군지 추가하는 db 수정 필요
  @Post(':userId/solved/:problemId/chat')
  createChatLog(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
    @Body() data: any,
  ): Promise<any> {
    return this.usersService.createChatLog(userId, problemId, data);
  }
}
