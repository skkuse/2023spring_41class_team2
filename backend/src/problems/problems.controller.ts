import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { Problem } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { response } from 'express';
import { join } from 'path';

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
