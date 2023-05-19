import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Param,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem, SuggestedQuestion } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { response } from 'express';
import { join } from 'path';
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
  // 지금 구현된건 이 api가 실행되면,  problem service에서 파일데이터를 file module을 통해 file디비에 저장을 하고, 그 id를 받아옴.
  // 문제정보 생성할 때, 먼저 문제를 생성하고, 그 문제id를 받아서 파일의 정보를 함께 problemfile에 저장하면 됨.
  @Post('addFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
      }),
    }),
  )
  async addProblemFile(
    @Param('problemid') problemid: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileData = {
      problemid: problemid,
      path: file.path,
      problemfilename: file.originalname,
      mimetype: file.mimetype,
    };
    const uploadedfile = await this.problemsService.saveFileData(fileData);
    if (!uploadedfile) throw new NotFoundException('No file uploaded');
    console.log(uploadedfile.id);
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
  // 지금 구현된건 이 api가 실행되면,  problem service에서 파일데이터를 file module을 통해 file디비에 저장을 하고, 그 id를 받아옴.
  // 문제정보 생성할 때, 먼저 문제를 생성하고, 그 문제id를 받아서 파일의 정보를 함께 problemfile에 저장하면 됨.
  @Post('addFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
      }),
    }),
  )
  async addProblemFile(
    @Param('problemid') problemid: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileData = {
      problemid: problemid,
      path: file.path,
      problemfilename: file.originalname,
      mimetype: file.mimetype,
    };
    const uploadedfile = await this.problemsService.saveFileData(fileData);
    if (!uploadedfile) throw new NotFoundException('No file uploaded');
    console.log(uploadedfile.id);

  @Delete(':problemId/questions/:questionId')
  deleteSuggestedQuestionById(
    @Param('questionId') suggestedQuestionId: number,
  ): Promise<SuggestedQuestion> {
    const suggestedquestion =
      this.problemsService.deleteSuggestedQuestionById(suggestedQuestionId);

    return suggestedquestion;
    //이제 받아온 파일id로 문제 생성하면 됨.
  }

  // 이건 나중에 파일id로 사진을 가져오는 것.
  @Get(':id')
  async getProblemFile(@Param('id') id: number) {
    const dbfile = await this.problemsService.getFileBtId(id);
    const stream = createReadStream(join(process.cwd(), dbfile.path));
    response.set({
      'Content-Disposition': `inline; filename="${dbfile.filename}"`,
      'Content-Type': dbfile.mimetype,
    });

    return new StreamableFile(stream);
  }
}
