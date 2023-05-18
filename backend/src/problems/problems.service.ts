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

  async findProblemById(problemId: number): Promise<Problem> {
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    return problem;
  }

  async createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
    const { title, content, answer } = createProblemDto;
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

  async deleteProblemById(problemId: number): Promise<Problem> {
    // for return message, not using findProblemById() function
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    await this.prisma.problem.delete({
      where: {
        id: problemId,
      },
    });

    return problem;
  }

  async hiddenToggle(problemId: number): Promise<Problem> {
    this.findProblemById(problemId);
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    problem.hidden = problem.hidden ? false : true;

    await this.prisma.problem.update({
      where: { id: problemId },
      data: problem,
    });

    return problem;
  }

  async updateProblem(
    problemId: number,
    createProblemDto: CreateProblemDto,
  ): Promise<Problem> {
    const pre_problem = await this.prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!pre_problem) {
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    }

    const post_problem = await this.prisma.problem.update({
      where: {
        id: problemId,
      },
      data: createProblemDto,
    });

    return post_problem;
  }

  async getSuggestedQuestion(problemId: number): Promise<any> {
    const suggestedquestion = await this.prisma.suggestedQuestion.findMany({
      where: {
        problemid: problemId,
      },
    });

    if (!suggestedquestion || suggestedquestion.length === 0)
      throw new NotFoundException('No Suggested Question found');

    console.log(suggestedquestion);
    console.log(typeof suggestedquestion);

    return suggestedquestion;
  }

  async createSuggestedQuestion(
    createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    const { problemid, content, answer } = createSuggestedQuestionDto;

    console.log('hello', problemid, content, answer);

    return await this.prisma.suggestedQuestion.create({
      data: {
        problemid: problemid,
        content: content,
        answer: answer,
      },
    });
  }

  async updateSuggestedQuestion(
    suggestedQuestionId: number,
    createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    const pre_suggestedquestion =
      await this.prisma.suggestedQuestion.findUnique({
        where: {
          id: suggestedQuestionId,
        },
      });

    if (!pre_suggestedquestion) {
      throw new NotFoundException(
        `Suggested Question with ID ${suggestedQuestionId} not found`,
      );
    }

    // Check whether the problemid is in the problem table or not
    const problem = await this.prisma.problem.findUnique({
      where: {
        id: createSuggestedQuestionDto.problemid,
      },
    });

    if (!problem) {
      throw new NotFoundException(
        `In Body, Problem with ID ${createSuggestedQuestionDto.problemid} not found`,
      );
    }

    console.log('123', createSuggestedQuestionDto);
    console.log('123', createSuggestedQuestionDto.problemid);

    const post_suggestedquestion = await this.prisma.suggestedQuestion.update({
      where: {
        id: suggestedQuestionId,
      },
      data: createSuggestedQuestionDto,
    });

    return post_suggestedquestion;
  }

  async deleteSuggestedQuestionById(
    suggestedQuestionId: number,
  ): Promise<SuggestedQuestion> {
    const suggestedquestion = await this.prisma.suggestedQuestion.findUnique({
      where: {
        id: suggestedQuestionId,
      },
    });

    if (!suggestedquestion) {
      throw new NotFoundException(
        `Suggested Question with ID ${suggestedquestion} not found`,
      );
    }

    await this.prisma.suggestedQuestion.delete({
      where: {
        id: suggestedQuestionId,
      },
    });

    return suggestedquestion;
  }
}
