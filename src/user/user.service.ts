import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/UserSchema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async registerUser(RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(RegisterDto.password, 10);
      const newUser = await this.userModel.create({
        ...RegisterDto,
        password: hashedPassword,
      });
      return {
        message: 'User registered successfully',
        statusCode: 201,
        newUser,
      };
    } catch (error) {
      return { error: error.message };
    }
  }
}
