import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignupResponseUserDto } from 'src/users/dto/signup-response-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userid: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserById(userid);
    const match = await bcrypt.compare(pass, user.password);
    if (!user || !match) {
      throw new UnauthorizedException();
    }
    const payload = { userid: user.userid };

    const result = {
      accessToken: this.jwtService.sign(payload),
    };

    console.log(result);

    return result;
  }

  async logout(user: User) {
    //need to implement invalidating token
    return {
      message: `User ${user.userid} logged out`,
    };
  }

  async signup(user: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser = await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });

    const createdUser = await this.usersService.findUserById(user.userid);
    const { password, ...result } = createdUser;

    return result as SignupResponseUserDto;
  }
}
