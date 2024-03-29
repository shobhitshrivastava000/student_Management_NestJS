import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/UserSchema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/user.register';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async registerUser(
    registerDTO: RegisterDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
      registerDTO.profilepic = file ? file.path : null;
      const newUser = await this.userModel.create({
        ...registerDTO,
        password: hashedPassword,
      });
      return res.status(HTTP_STATUSCODE.CREATED).json({
        message: MESSAGES.REGISTERED,

        newUser,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async loginUser(LoginDTO, res: Response) {
    try {
      const email = LoginDTO.email;
      const existUser = await this.userModel.findOne(
        { email },
        'username email password',
      );
      if (!existUser) {
        return res
          .status(HTTP_STATUSCODE.BAD_REQUEST)
          .json({ message: MESSAGES.USER_NOT_FOUND });
      }
      const passwordMatch = await bcrypt.compare(
        LoginDTO.password,
        existUser.password,
      );
      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            existUser: {
              username: existUser.username,
              email: existUser.email,
              id: existUser._id,
            },
          },
          process.env.ACCESSTOKEN_SECRET,
          { expiresIn: '7d' },
        );
        return res.status(HTTP_STATUSCODE.SUCCESS).json({
          message: MESSAGES.LOGIN,
          accessToken,
        });
      }
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
}
