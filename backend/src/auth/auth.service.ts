import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new BadRequestException();
    }
    const payload = { userid: user.userid, isAdmin: user.isAdmin };

    const result = {
      accessToken: this.jwtService.sign(payload),
    };

    return result;
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

  async tokenValidate(payload: any): Promise<any> {
    return await this.usersService.findUserById(payload.userid);
  }

  //header에 있는 토큰을 가져와서 유저정보를 가져온다.
  async getUserInfo(req: any): Promise<any> {
    const token = req.headers.authorization.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const user = await this.usersService.findUserById(payload.userid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      userid: user.userid,
      nickname: user.nickname,
      email: user.email,
    };
  }
}
