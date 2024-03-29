import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './dto/student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentUpdateDTO } from './dto/studentupdate.dto';
import { StudentLoginDto } from './dto/studentLogin.dto';
import { Response } from 'express';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('createstudent')
  @UseInterceptors(FileInterceptor('studentpic'))
  async createStudent(
    @UploadedFile() file,
    @Body(new ValidationPipe()) studentDTO: StudentDto,
    @Res() res: Response,
  ) {
    return this.studentService.createStudent(studentDTO, file, res);
  }

  @Get('getallstudent')
  async getAllstudent(@Res() res: Response) {
    return this.studentService.getAllstudent(res);
  }

  @Get('getstudent/:studentid')
  async getstudent(
    @Res() res: Response,
    @Param('studentid') studentid: string,
  ) {
    return this.studentService.getstudent(studentid, res);
  }

  @Put('updatestudent/:studentid')
  @UseInterceptors(FileInterceptor('studentpic'))
  async updateStudent(
    @UploadedFile() file: Express.Multer.File,
    @Body() studentUpdateDto: Partial<StudentUpdateDTO>,
    @Param('studentid') studentid: string,
    @Res() res: Response,
  ) {
    return this.studentService.updateStudent(
      studentUpdateDto,
      studentid,
      file,
      res,
    );
  }

  @Delete('deletestudent/:studentid')
  async deleteStudent(
    @Res() res: Response,
    @Param('studentid') studentid: string,
  ) {
    return this.studentService.deleteStudent(studentid, res);
  }

  @Post('studentlogin')
  async studentLogin(
    @Res() res: Response,
    @Body() loginstudentdto: StudentLoginDto,
  ) {
    return this.studentService.studentLogin(loginstudentdto, res);
  }
}
