import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem, SuggestedQuestion } from '@prisma/client';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateSuggestedQuestionDto } from './dto/create-suggested-question.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  getAllProblems(): Promise<{ id: number; title: string }[]> {
    return this.problemsService.getAllProblems();
  }

  @Post()
  createProblem(@Body() problemData: CreateProblemDto): Promise<Problem> {
    return this.problemsService.createProblem(problemData);
  }

  //디버그용
  @Delete()
  deleteAllProblem(): Promise<void> {
    return this.problemsService.deleteAllProblem();
  }

  @Get(':problemId')
  findProblemById(@Param('problemId') problemId: string): Promise<Problem> {
    return this.problemsService.findProblemById(problemId);
  }

  @Delete(':problemId')
  deleteProblemById(@Param('problemId') problemId: string): Promise<Problem> {
    return this.problemsService.deleteProblemById(problemId);
  }

  @Patch(':problemId')
  updateProblem(
    @Param('problemId') problemId: string,
    @Body() data: Problem,
  ): Promise<Problem> {
    const problem = this.problemsService.updateProblem(problemId, data);

    return problem;
  }

  @Get(':problemId/questions')
  getSuggestedQuestion(@Param('problemId') problemId: string): Promise<any> {
    return this.problemsService.getAllQuestions(problemId);
  }

  @Post(':problemId/questions')
  createSuggestedQuestion(
    @Body() createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    return this.problemsService.createQuestion(createSuggestedQuestionDto);
  }

  @Patch(':problemId/questions/:questionId')
  updateSuggestedQuestion(
    @Param('questionId') suggestedQuestionId: number,
    @Body() createSuggestedQuestionDto: CreateSuggestedQuestionDto,
  ): Promise<SuggestedQuestion> {
    const suggestedQuestion = this.problemsService.updateQuestion(
      suggestedQuestionId,
      createSuggestedQuestionDto,
    );

    return suggestedQuestion;
  }

  @Delete(':problemId/questions/:questionId')
  deleteSuggestedQuestionById(
    @Param('questionId') suggestedQuestionId: number,
  ): Promise<SuggestedQuestion> {
    const suggestedquestion =
      this.problemsService.deleteSuggestedQuestionById(suggestedQuestionId);

    return suggestedquestion;
  }
}
