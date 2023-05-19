import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSuggestedQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  problemId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
