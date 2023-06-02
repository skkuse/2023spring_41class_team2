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
import { Speaker, User } from '@prisma/client';
import { AdminGuard } from 'src/auth/guard/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('leaderboard')
  getLeaderboard(): Promise<any> {
    return this.usersService.getLeaderboard();
  }

  //Nest는 내부적으로 async/await를 사용해서 명시적으로 async를 쓰지 않아도 됨
  //하지만 이 API에서 async를 사용하지 않으면 password를 빼지 못함
  @Get(':userId')
  async findUserById(@Param('userId') userId: string): Promise<any> {
    const foundUser = await this.usersService.findUserById(userId);
    const { password, ...result } = foundUser;
    return result;
  }

  //Nest는 내부적으로 async/await를 사용해서 명시적으로 async를 쓰지 않아도 됨
  //하지만 이 API에서 async를 사용하지 않으면 password를 빼지 못함
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: any,
  ): Promise<any> {
    const updatedUser = await this.usersService.updateUser(userId, data);
    const { password, ...result } = updatedUser;
    return result;
  }

  //유저 밴 및 일시 정지, unbannedAt로 결정
  @UseGuards(AdminGuard)
  @Patch(':userId/ban')
  banUser(
    @Param('userId') userId: string,
    @Body('isBanned') isBanned: boolean,
    @Body('unbannedAt') unbannedDate: string,
  ): Promise<any> {
    return this.usersService.banUser(userId, isBanned, unbannedDate);
  }

  //유저가 풀어본 문제들
  @Get(':userId/solved')
  getAllSolvedProblems(@Param('userId') userId: string): Promise<any> {
    return this.usersService.getAllSolvedProblems(userId);
  }

  //문제 제출 (prisma upsert 사용)
  @Post(':userId/solved/:problemId')
  submitProblem(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
    @Body('submittedValue') submittedValue: string,
  ): Promise<any> {
    return this.usersService.createProblemStatus(
      userId,
      problemId,
      submittedValue,
    );
  }

  //유저가 푼 문제의 채팅 로그
  @Get(':userId/solved/:problemId/chat')
  getChatLog(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
  ): Promise<any> {
    return this.usersService.getChatLog(userId, problemId);
  }

  @Post(':userId/solved/:problemId/chat')
  createChatLog(
    @Param('userId') userId: string,
    @Param('problemId') problemId: string,
    @Body('speaker') speaker: Speaker,
    @Body('content') content: string,
  ): Promise<any> {
    return this.usersService.createChatLog(userId, problemId, speaker, content);
  }
}
