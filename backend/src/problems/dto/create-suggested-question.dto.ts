import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSuggestedQuestionDto {
  @IsNotEmpty()
  @IsNumber()
  problemid: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  answer: string;
}
