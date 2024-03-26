import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/user.register';
// import { LoginDto } from './dto/user.login';

@Controller('user')
export class UserController {
  constructor(private userservices: UserService) {}

  @Post('register')
  async registerUser(@Body(new ValidationPipe()) registerDTO: RegisterDto) {
    return this.userservices.registerUser(registerDTO);
  }

  //   @Post('login')
  //   async loginUser(@Body() LoginDTO: LoginDto) {
  //     return this.userservices.loginUser(LoginDTO);
  //   }
}
