import {
  Controller,
  Get,
  NotFoundException,
  Query,
  ParseIntPipe,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem, SuggestedQuestion } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateSuggestedQuestionDto } from './dto/create-suggested-question.dto';

@Controller('problem')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get('/all')
  async getAllProblems(): Promise<{ id: number; title: string }[]> {
    const problems = await this.problemsService.getAllProblems();
    if (!problems || problems.length === 0)
      throw new NotFoundException('No Problems Found');

    return problems;
  }

  @Get('/')
  async getProblemById(
    @Query('problemId', ParseIntPipe) problemId: number,
  ): Promise<Problem> {
    const problem = await this.problemsService.findProblemById(problemId);

    if (!problem)
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async createProblem(
    @Body() createProblemDto: CreateProblemDto,
  ): Promise<Problem> {
    return await this.problemsService.createProblem(createProblemDto);
  }

  @Delete('/all')
  async deleteAllProblem(): Promise<void> {
    return await this.problemsService.deleteAllProblem();
  }

  @Delete('/')
  async deleteProblemById(
    @Query('problemId', ParseIntPipe) problemId: number,
  ): Promise<Problem> {
    const problem = await this.problemsService.deleteProblemById(problemId);

    if (!problem)
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Patch('/hidden')
  async hiddenToggle(
    @Query('problemId', ParseIntPipe) problemId: number,
  ): Promise<Problem> {
    const problem = await this.problemsService.hiddenToggle(problemId);

    if (!problem)
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Patch('/')
  async updateProblem(
    @Query('problemId', ParseIntPipe) problemId: number,
    @Body() createProblemDto: CreateProblemDto,
  ): Promise<Problem> {
    const problem = await this.problemsService.updateProblem(
      problemId,
      createProblemDto,
    );

    if (!problem)
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Get('/suggested')
  async getSuggestedQuestion(
    @Query('problemId', ParseIntPipe) problemId: number,
  ): Promise<any> {
    const suggestedquestion = await this.problemsService.getSuggestedQuestion(
      problemId,
    );

    if (!suggestedquestion || suggestedquestion.length === 0)
      throw new NotFoundException('No Suggested Question Found');

    return suggestedquestion;
  }

  @Post('/suggested')
  @UsePipes(ValidationPipe)
  async createSuggestedQuestion(
    @Body() createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    return await this.problemsService.createSuggestedQuestion(
      createSuggestedQuestionDto,
    );
  }
}
