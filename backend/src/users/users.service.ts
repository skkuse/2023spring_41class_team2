import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Status, Speaker } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
    return this.prisma.user.create({
      data: userData,
    });
  }

  async updateUser(userId: string, data: any): Promise<User> {
    const updatedData: any = {};

    if (data.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.password, salt);
      updatedData.password = hashedPassword;
    }

    if (data.nickname) {
      updatedData.nickname = data.nickname;
    }

    if (data.email) {
      updatedData.email = data.email;
    }

    if (data.isAdmin || data.isAdmin === false) {
      updatedData.isAdmin = data.isAdmin;
    }

    return this.prisma.user.update({
      where: {
        userid: userId,
      },
      data: updatedData,
    });
  }

  async banUser(
    userId: string,
    isBanned: boolean,
    unbannedDate: string,
  ): Promise<any> {
    const user = await this.prisma.user.update({
      where: {
        userid: userId,
      },
      data: {
        isBanned: isBanned,
        unbannedAt: new Date(unbannedDate),
      },
    });

    return user;
  }

  async getAllSolvedProblems(userId: string): Promise<any> {
    const solvedProblems = await this.prisma.solved.findMany({
      where: {
        userid: userId,
        status: Status.Solved,
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
        status: data.status,
      },
    });

    return updatedProblem;
  }

  async createProblemStatus(
    userId: string,
    problemId: string,
    submittedValue: string,
  ): Promise<any> {
    const problem = await this.prisma.problem.findUnique({
      select: {
        answer: true,
      },
      where: {
        id: parseInt(problemId),
      },
    });

    let status: Status = Status.Wrong;
    if (problem.answer === submittedValue) {
      status = Status.Solved;
    }

    const newProblemStatus = await this.prisma.solved.upsert({
      where: {
        userid_problemid: {
          userid: userId,
          problemid: parseInt(problemId),
        },
      },
      create: {
        userid: userId,
        problemid: parseInt(problemId),
        status: status,
      },
      update: {
        status: status,
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
        createdAt: 'asc',
      },
      take: 100,
    });

    return chatLog;
  }

  async createChatLog(
    userId: string,
    problemId: string,
    speaker: Speaker,
    content: string,
  ): Promise<any> {
    let solved = await this.prisma.solved.findUnique({
      where: {
        userid_problemid: {
          userid: userId,
          problemid: parseInt(problemId),
        },
      },
    });

    if (!solved) {
      solved = await this.prisma.solved.create({
        data: {
          userid: userId,
          problemid: parseInt(problemId),
          status: Status.Wrong,
        },
      });
    }

    const newChatLog = await this.prisma.chatlog.create({
      data: {
        solvedid: solved.id,
        content: content,
        speaker: speaker,
      },
    });

    return newChatLog;
  }

  async getLeaderboard(): Promise<any> {
    const leaderboard = await this.prisma.solved.groupBy({
      by: ['userid'],
      where: { status: Status.Solved },
      _count: { problemid: true },
      orderBy: { _count: { userid: 'desc' } },
      take: 10, //top 10
    });

    if (!leaderboard || leaderboard.length === 0) {
      throw new NotFoundException(`No Solved Records found`);
    }

    const leaderboardWithNicknames = await Promise.all(
      leaderboard.map(async (entry) => {
        const user = await this.prisma.user.findUnique({
          where: { userid: entry.userid },
          select: { nickname: true },
        });

        return {
          ...entry,
          nickname: user ? user.nickname : null,
        };
      }),
    );

    return leaderboardWithNicknames;
  }
}
