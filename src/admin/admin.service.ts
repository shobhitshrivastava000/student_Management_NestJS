import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schema/adminschema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from './dto/admin.register';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: mongoose.Model<Admin>,
  ) {}

  async registerUser(
    registerDTO: RegisterDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
      registerDTO.profilepic = file ? file.path : null;
      const newUser = await this.adminModel.create({
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
      const existAdmin = await this.adminModel.findOne(
        { email },
        'username email password',
      );
      if (!existAdmin) {
        return res
          .status(HTTP_STATUSCODE.BAD_REQUEST)
          .json({ message: MESSAGES.USER_NOT_FOUND });
      }
      const passwordMatch = await bcrypt.compare(
        LoginDTO.password,
        existAdmin.password,
      );
      if (passwordMatch) {
        const accessToken = jwt.sign(
          {
            existAdmin: {
              adminname: existAdmin.username,
              email: existAdmin.email,
              id: existAdmin._id,
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
