import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Username should not Empty' })
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password is should not be short' })
  readonly password: string;

  @IsString()
  readonly class: string;

  @IsString()
  readonly school: string;

  @IsString()
  readonly profilepic: string;

  @IsNumber()
  @IsOptional()
  readonly role: number;
}
