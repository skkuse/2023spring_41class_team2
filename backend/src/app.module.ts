import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, ProblemsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
