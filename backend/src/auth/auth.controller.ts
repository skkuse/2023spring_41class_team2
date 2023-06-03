import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
    res.cookie('jwt', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.send(jwt);
  }

  @Post('logout')
  logout(@Request() req, @Res() res: Response) {
    //res.cookie('jwt', '', { maxAge: 0 });
    res.clearCookie('accessToken');
    return res.send({ message: 'logout success' });
  }

  @UsePipes(ValidationPipe)
  @Post('signup')
  signup(@Body() userData: CreateUserDto) {
    return this.authService.signup(userData);
  }

  @Post('validate')
  validate(
    @Body('userid') userid: string,
    @Body('password') password: string,
  ): Promise<any> {
    return this.authService.validateUser(userid, password);
  }

  @UseGuards(AuthGuard)
  @Get('myinfo')
  myinfo(@Request() req): Promise<any> {
    return this.authService.getUserInfo(req);
  }
}
