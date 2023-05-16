import { Controller, Request, Get, Post, UseGuards, Body, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { AuthGuard } from './guard/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseUserDto } from 'src/users/dto/signup-response-user.dto';
import { AdminGuard } from './guard/admin.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body('userid') userid: string,
    @Body('password') password: string,
    @Res() res: Response,
  ): Promise<any> {
    const jwt = await this.authService.validateUser(userid, password);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    res.cookie('jwt', jwt.accessToken, { httpOnly: true, secure: false, maxAge: 3600000 });

    return res.send({message:'login success'});
  }

  @Post('logout')
  async logout(@Request() req, @Res() res: Response){
    res.cookie('jwt', "", {maxAge: 0});
    return res.send({message:'logout success'});
  }

  @UsePipes(ValidationPipe)
  @Post('signup')
  async signup(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get('authenticate')
  async authenticate(@Request() req): Promise<any> {
    const user: any = req.user;
    return user;

  }
}
