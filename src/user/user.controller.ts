import {
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/user.register';

import { FileInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { LoginDto } from './dto/user.login';

@Controller('user')
export class UserController {
  constructor(private userservices: UserService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('profilepic'))
  async registerUser(
    @UploadedFile() file,
    @Body(new ValidationPipe()) registerDTO: RegisterDto,
    @Res() res: Response,
  ) {
    return this.userservices.registerUser(registerDTO, file, res);
  }

  @Post('login')
  async loginUser(@Body() LoginDTO: LoginDto, @Res() res: Response) {
    return this.userservices.loginUser(LoginDTO, res);
  }
}
