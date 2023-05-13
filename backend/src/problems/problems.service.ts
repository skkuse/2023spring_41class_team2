import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Problem } from '@prisma/client';

@Injectable()
export class ProblemsService {
    constructor(private prisma: PrismaService){}

    async findProblemById(problemId: number): Promise<Problem> {
        const problem = await this.prisma.problem.findUnique({
            where: {
                id: problemId,
            },
        });

        if (!problem) throw new NotFoundException(`Problem with ID ${problemId} not found`);

        return problem;
    }

    async getAllProblems(): Promise<any> {
        const problems = await this.prisma.problem.findMany({
            select: {
                id: true,
                title: true,
            },
        });

        if (!problems || problems.length === 0) throw new NotFoundException('No problems found');
        return problems;
    }

}
