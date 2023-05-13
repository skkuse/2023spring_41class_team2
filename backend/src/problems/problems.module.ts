import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService, PrismaService]
})
export class ProblemsModule {}
