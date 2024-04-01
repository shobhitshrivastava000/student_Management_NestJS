//Student Login Do
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class StudentLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
