import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Student } from 'src/student/schema/studentSchema';
import { User } from 'src/user/schema/UserSchema';
@Injectable()
export class StudentMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Student.name)
    private studentModel: mongoose.Model<Student>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(HTTP_STATUSCODE.BAD_REQUEST).json({
        message: MESSAGES.TOKEN_REQUIRED,
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

    console.log('student', decoded);

    if (decoded.existStudent) {
      const student = await this.studentModel.findById(decoded.existStudent.id);
      if (!student) {
        return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
          message: MESSAGES.STUDENT_NOT_FOUND,
        });
      }
      next();
    } else {
      const user = await this.userModel.findById(decoded.existUser.id);
      console.log(user);
      if (!user) {
        return res.status(HTTP_STATUSCODE.UNAUTHORIZED).json({
          message: MESSAGES.UNAUTHORIZED,
        });
      }

      next();
    }
  }
}
