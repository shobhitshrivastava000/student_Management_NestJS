import { AdminService } from './admin.service';
import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';

import { RegisterDto } from './dto/admin.register';

import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { LoginDto } from './dto/admin.login';
import { ResetPasswordDto } from './dto/admin.resetpassword.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminservices: AdminService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profilepic'))
  async registerAdmin(
    @UploadedFile() file,
    @Body(new ValidationPipe()) registerDTO: RegisterDto,
    @Res() res: Response,
  ) {
    return this.adminservices.registerAdmin(registerDTO, file, res);
  }

  @Post('login')
  async loginAdmin(@Body() LoginDTO: LoginDto, @Res() res: Response) {
    return this.adminservices.loginAdmin(LoginDTO, res);
  }

  @Post('resetpassword')
  async resetPassword(
    @Body() passwordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    return this.adminservices.resetPassword(passwordDto, res);
  }
}
