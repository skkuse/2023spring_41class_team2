import { Controller, Request, Post, UseGuards, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignupResponseUserDto } from 'src/users/dto/signup-response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body('userid') userid: string, 
              @Body('password') password: string, 
              @Res() res: Response
    ) : Promise<any> {
    const jwt = await this.authService.validateUser(userid, password);
    res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
    return res.json(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req){
    return this.authService.logout(req.user);
  }

  @Post('signup')
  async signup(@Body() userData: CreateUserDto){
    return this.authService.signup(userData);
  }

}
