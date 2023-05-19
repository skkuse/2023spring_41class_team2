import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
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
    return this.prisma.user.create({
      data: userData,
    });
  }

  async banUser(userId: string): Promise<any> {
    const user = await this.prisma.user.update({
      where: {
        userid: userId,
      },
      data: {
        isBanned: true,
      },
    });

    return user;
  }

  async getAllSolvedProblems(userId: string): Promise<any> {
    const solvedProblems = await this.prisma.solved.findMany({
      where: {
        userid: userId,
        status: 1,
      },
    });

    if (!solvedProblems || solvedProblems.length === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return solvedProblems;
  }

  async updateSolvedStatus(
    userId: string,
    problemId: string,
    data: any,
  ): Promise<any> {
    const updatedProblem = await this.prisma.solved.update({
      where: {
        userid_problemid: {
          userid: userId,
          problemid: parseInt(problemId),
        },
      },
      data: {
        status: parseInt(data.status),
      },
    });

    return updatedProblem;
  }

  async createProblemStatus(
    userId: string,
    problemId: string,
    data: any,
  ): Promise<any> {
    const newProblemStatus = await this.prisma.solved.create({
      data: {
        userid: userId,
        problemid: parseInt(problemId),
        status: parseInt(data.status),
      },
    });

    return newProblemStatus;
  }

  async getChatLog(userId: string, problemId: string): Promise<any> {
    const solved = await this.prisma.solved.findUnique({
      where: {
        userid_problemid: {
          userid: userId,
          problemid: parseInt(problemId),
        },
      },
    });

    const chatLog = await this.prisma.chatlog.findMany({
      where: {
        solvedid: solved.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return chatLog;
  }

  async createChatLog(userId: string, problemId: string, data: any) {
    const solved = await this.prisma.solved.findUnique({
      where: {
        userid_problemid: {
          userid: userId,
          problemid: parseInt(problemId),
        },
      },
    });

    const newChatLog = await this.prisma.chatlog.create({
      data: {
        solvedid: solved.id,
        content: data.content,
      },
    });

    return newChatLog;
  }
}
