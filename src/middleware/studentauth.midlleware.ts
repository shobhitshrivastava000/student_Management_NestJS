//Student Auth for Login, UPdate, View Data

import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Student } from 'src/student/schema/studentSchema';
import { Admin } from 'src/admin/schema/adminschema';
@Injectable()
export class StudentMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: mongoose.Model<Admin>,
    @InjectModel(Student.name)
    private studentModel: mongoose.Model<Student>,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers['authorization'];
      if (!token) {
        return res.status(HTTP_STATUSCODE.BAD_REQUEST).json({
          message: MESSAGES.TOKEN_REQUIRED,
        });
      }
      const decoded = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

      console.log('student', decoded);

      if (decoded.existStudent) {
        const student = await this.studentModel.findById(
          decoded.existStudent.id,
        );
        if (!student) {
          return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
            message: MESSAGES.STUDENT_NOT_FOUND,
          });
        }
        next();
      } else {
        const admin = await this.adminModel.findById(decoded.existAdmin.id);
        console.log(admin);
        if (!admin) {
          return res.status(HTTP_STATUSCODE.UNAUTHORIZED).json({
            message: MESSAGES.UNAUTHORIZED,
          });
        }

        next();
      }
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
}
