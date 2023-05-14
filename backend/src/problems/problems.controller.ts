import { Controller, Get, Param, Post, Body, NotFoundException } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem } from '@prisma/client';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':problemId')
  async getProblemInfo(@Param('problemId') problemId: number): Promise<Problem> {

    const problem = await this.problemsService.findProblemById(problemId);

    if (!problem) throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Get('list')
  async getAllProblems(): Promise<{id: number; title: string}[]> {
    const problems = await this.problemsService.getAllProblems();

    if (!problems || problems.length === 0) throw new NotFoundException('No problems found');

    return problems;
  }

  // Every Question for this problem
  // @Get(':problemId/questions')



}
