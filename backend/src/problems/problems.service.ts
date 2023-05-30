import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Problem, SuggestedQuestion } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateSuggestedQuestionDto } from './dto/create-suggested-question.dto';

@Injectable()
export class ProblemsService {
  constructor(private prisma: PrismaService) {}

  async getAllProblems(): Promise<any> {
    const problems = await this.prisma.problem.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    if (!problems || problems.length === 0)
      throw new NotFoundException('No problems found');
    return problems;
  }

  async findProblemById(problemId: string): Promise<Problem> {
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: parseInt(problemId),
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    return problem;
  }

  async createProblem(problemData: CreateProblemDto): Promise<Problem> {
    const { title, content, answer } = problemData;
    return await this.prisma.problem.create({
      data: {
        title: title,
        content: content,
        answer: answer,
      },
    });
  }

  async deleteAllProblem(): Promise<any> {
    return await this.prisma.problem.deleteMany({});
  }

  async deleteProblemById(problemId: string): Promise<Problem> {
    // for return message, not using findProblemById() function
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: parseInt(problemId),
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    await this.prisma.problem.delete({
      where: {
        id: parseInt(problemId),
      },
    });

    return problem;
  }

  async updateProblem(problemId: string, data: Problem): Promise<Problem> {
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: parseInt(problemId),
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    const updatedProblem = await this.prisma.problem.update({
      where: {
        id: parseInt(problemId),
      },
      data: data,
    });

    return updatedProblem;
  }

  async getAllQuestions(problemId: string): Promise<any> {
    const questions = await this.prisma.suggestedQuestion.findMany({
      where: {
        problemid: parseInt(problemId),
      },
    });

    if (!questions || questions.length === 0)
      throw new NotFoundException('No Questions found');

    return questions;
  }

  async createQuestion(
    createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    const { problemId, content } = createSuggestedQuestionDto;

    return await this.prisma.suggestedQuestion.create({
      data: {
        content: content,
        problem: {
          connect: {
            id: problemId,
          },
        },
      },
    });
  }

  async updateQuestion(
    suggestedQuestionId: number,
    createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    const question = await this.prisma.suggestedQuestion.findUnique({
      where: {
        id: suggestedQuestionId,
      },
    });

    if (!question) {
      throw new NotFoundException(
        `Suggested Question with ID ${suggestedQuestionId} not found`,
      );
    }

    // Check whether the problemid is in the problem table or not
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: createSuggestedQuestionDto.problemId,
      },
    });

    if (!problem) {
      throw new NotFoundException(
        `In Body, Problem with ID ${createSuggestedQuestionDto.problemId} not found`,
      );
    }

    const updatedQuestion = await this.prisma.suggestedQuestion.update({
      where: {
        id: suggestedQuestionId,
      },
      data: createSuggestedQuestionDto,
    });

    return updatedQuestion;
  }

  async deleteSuggestedQuestionById(
    suggestedQuestionId: number,
  ): Promise<SuggestedQuestion> {
    const question = await this.prisma.suggestedQuestion.findUnique({
      where: {
        id: suggestedQuestionId,
      },
    });

    if (!question) {
      throw new NotFoundException(
        `Suggested Question with ID ${question} not found`,
      );
    }

    await this.prisma.suggestedQuestion.delete({
      where: {
        id: suggestedQuestionId,
      },
    });

    return question;
  }

  async saveFileData(fileData: {
    problemid: number;
    path: string;
    problemfilename: string;
    mimetype: string;
  }) {
    const newFileData = await this.prisma.problemFile.create({
      data: fileData,
    });
    return newFileData;
  }

  async getFileById(fileId: number): Promise<any> {
    const dbfile = await this.prisma.problemFile.findUnique({
      where: { id: fileId },
    });
    if (!dbfile) throw new NotFoundException('No file found');
    return dbfile;
  }
}
