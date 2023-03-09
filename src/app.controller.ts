import { BadRequestException, Controller, Get, Req, Res } from '@nestjs/common';
import { Body, Post, UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthGuard } from './gaurds/auth.gaurd';
import { LoginSchema, RegisterSchema } from './joi-schema/schema';
import { PassThrough } from 'stream';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const { error } = RegisterSchema.validate({ name,email, password });

    if (error) {
      throw new BadRequestException(error);
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.appService.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { error } = LoginSchema.validate({ email, password });

    if (error) {
      throw new BadRequestException(error);
    }

    const user = await this.appService.findOne({ email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Logged in successfully',
    };
  }

  @Post('logout')
    async logout(@Res({ passthrough: true }) response:Response ){
      response.clearCookie('jwt');

      return{
        message:"Logged out successfully"
      }
    }

}
