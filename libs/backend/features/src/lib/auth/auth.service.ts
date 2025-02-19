import { LoginDto } from '@lingua/dto';
import { User, UserDocument } from '@lingua/schemas';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ICreateUser } from '@lingua/api';

@Injectable()
export class AuthService {
  private TAG = 'AuthService';

  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    Logger.log('login', this.TAG);
    
    const user = await this.userModel
    .findOne({
      email: loginDto.email,
    })
      .exec();
      
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };

    return { access_token: this.jwtService.sign(payload) };
  }
  
  async register(registerDto: ICreateUser) {
    Logger.log('register', this.TAG);
    
    const existingUser = await this.userModel
      .findOne({
        email: registerDto.email,
      })
      .exec();

    if (existingUser) throw new UnauthorizedException('Email already exists');

    const hashedPassword = await bcrypt.hashSync(registerDto.password, 10);

    const user = await this.userModel.create({
      email: registerDto.email,
      firstname: registerDto.firstname,
      lastname: registerDto.lastname,
      role: registerDto.role,
      password: hashedPassword,
    });

    const payload = { sub: user._id, email: user.email, role: user.role };
    
    return { access_token: this.jwtService.sign(payload) };
  }
}
