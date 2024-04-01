//Register DTO
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Username should not Empty' })
  readonly adminname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password is should not be short' })
  readonly password: string;

  profilepic: string;
}
