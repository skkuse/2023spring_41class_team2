import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get(':problemId')
  async getProblemInfo(
    @Param('problemId') problemId: number,
  ): Promise<Problem> {
    const problem = await this.problemsService.findProblemById(problemId);

    if (!problem)
      throw new NotFoundException(`Problem with ID ${problemId} not found`);
    return problem;
  }

  @Get('list')
  async getAllProblems(): Promise<{ id: number; title: string }[]> {
    const problems = await this.problemsService.getAllProblems();

    if (!problems || problems.length === 0)
      throw new NotFoundException('No problems found');

    return problems;
  }
  // 지금 구현된건 이 api가 실행되면,  problem service에서 파일데이터를 file module을 통해 file디비에 저장을 하고, 그 id를 받아옴. 그걸로 problem 생성하거나 수정할 때 활용.
  // 이걸 문제정보 생성할 때 복붙해서 쓰면 그 파일의 정보를 함께 저장할 수 있게 될 것.
  @Post('addFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploadedFiles',
      }),
    }),
  )
  async addFile(@UploadedFile() file: Express.Multer.File) {
    const fileData = {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    };
    const uploadedfile = await this.problemsService.saveFileData(fileData);
    if (!uploadedfile) throw new NotFoundException('No file uploaded');
    console.log(uploadedfile.id);

    //이제 받아온 파일id로 문제 생성하면 됨.
  }
}
