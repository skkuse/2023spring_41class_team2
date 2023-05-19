import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  userid: string;
  @IsNotEmpty()
  nickname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
