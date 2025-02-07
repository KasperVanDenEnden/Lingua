import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@lingua/dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ICreateUser } from '@lingua/api';

@Controller('auth')
export class AuthController {
  private TAG = 'AuthController';
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    Logger.log('login', this.TAG);
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: ICreateUser) {
    Logger.log('register', this.TAG);
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
