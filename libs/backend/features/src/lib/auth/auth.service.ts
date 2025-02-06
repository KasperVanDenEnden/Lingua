import { LoginDto, RegisterDto } from '@lingua/dto';
import { User, UserDocument } from '@lingua/schemas';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    private TAG = 'AuthService';

    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>, 
        private jwtService:JwtService
    ) {}

    async login(loginDto:LoginDto) {
        const user = await this.userModel.findOne({
            email: loginDto.email,
        }).exec();
        
        if (!user) throw new UnauthorizedException('Invalid credentials');
        
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
        
        const payload = {sub: user.id, email: user.email, role: user.role };

        return { access_token: this.jwtService.sign(payload) };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userModel.findOne({
            email: registerDto.email,
        }).exec();

          if (existingUser) throw new UnauthorizedException('Email already exists');

          const hashedPassword = await bcrypt.hashSync(registerDto.password, 10);
          const user = await this.userModel.create({
            email: registerDto.email,
            role: registerDto.role,
            password: hashedPassword
          });

          const payload = { sub: user._id, email: user.email, role: user.role };
          return { access_token: this.jwtService.sign(payload) };
    }
}
