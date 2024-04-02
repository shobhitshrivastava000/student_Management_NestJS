import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Student } from './schema/studentSchema';
import { StudentDto } from './dto/student.dto';
import * as bcrypt from 'bcrypt';
import { StudentUpdateDTO } from './dto/studentupdate.dto';
import * as jwt from 'jsonwebtoken';
import { HTTP_STATUSCODE, MESSAGES } from 'src/constant';
import { Response } from 'express';
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: mongoose.Model<Student>,
  ) {}

  async createStudent(
    studentDTO: StudentDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(studentDTO.password, 10);
      studentDTO.studentpic = file ? file.path : null;
      const newStudent = await this.studentModel.create({
        ...studentDTO,
        password: hashedPassword,
      });
      return res.status(HTTP_STATUSCODE.CREATED).json({
        message: MESSAGES.STUDENT_REGISTERED,
        statusCode: HTTP_STATUSCODE.CREATED,
        newStudent,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async getAllstudent(res: Response) {
    try {
      const student = await this.studentModel.find({});

      if (!student) {
        return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
          message: MESSAGES.STUDENT_NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.ALL_STUDENTS,

        student,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async getstudent(studentid: string, res: Response) {
    try {
      const student = await this.studentModel.findById(studentid);
      if (!student) {
        return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
          message: MESSAGES.STUDENT_NOT_FOUND,
        });
      }

      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.SINGLE_STUDENT,
        student,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async updateStudent(
    studentUpdateDto: Partial<StudentUpdateDTO>,
    studentid: string,
    file: Express.Multer.File,
    res: Response,
  ) {
    try {
      const student = await this.studentModel.findById(studentid);

      if (!student) {
        return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
          message: MESSAGES.STUDENT_NOT_FOUND,
        });
      }

      if (file) {
        student.studentpic = file.path;
      }

      Object.assign(student, studentUpdateDto);

      const updatedStudent = await student.save();

      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.STUDENT_DATA_UPDATED,
        updatedStudent,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async deleteStudent(studentid: string, res: Response) {
    try {
      const student = await this.studentModel.findById(studentid);

      if (!student) {
        return res.status(HTTP_STATUSCODE.NOT_FOUND).json({
          message: MESSAGES.STUDENT_NOT_FOUND,
        });
      }
      const deletedStudent =
        await this.studentModel.findByIdAndDelete(studentid);
      return res.status(HTTP_STATUSCODE.SUCCESS).json({
        message: MESSAGES.STUDENT_DATA_DELETED,
        deletedStudent,
      });
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }

  async studentLogin(loginstudentdto, res: Response) {
    try {
      const email = loginstudentdto.email;
      const existStudent = await this.studentModel.findOne(
        { email },
        'username email password',
      );
      if (!existStudent) {
        return res
          .status(HTTP_STATUSCODE.BAD_REQUEST)
          .json({ message: MESSAGES.STUDENT_NOT_EXIST });
      }
      const passwordMatch = await bcrypt.compare(
        loginstudentdto.password,
        existStudent.password,
      );
      if (passwordMatch) {
        const studentAccessToken = jwt.sign(
          {
            existStudent: {
              studentname: existStudent.studentName,
              email: existStudent.email,
              id: existStudent._id,
            },
          },
          process.env.ACCESSTOKEN_SECRET,
          { expiresIn: '7d' },
        );
        return res.status(HTTP_STATUSCODE.SUCCESS).json({
          message: MESSAGES.STUDENT_LOGIN_SUCCESSFULLY,

          studentAccessToken,
        });
      }
    } catch (error) {
      return res
        .status(HTTP_STATUSCODE.SERVER_ERROR)
        .json({ message: MESSAGES.UNEXPECTED_ERROR, error: error.message });
    }
  }
}
