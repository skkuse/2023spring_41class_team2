import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProblemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
