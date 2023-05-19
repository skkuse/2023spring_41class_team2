import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
