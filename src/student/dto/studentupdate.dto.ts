import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class StudentUpdateDTO {
  @IsString()
  @IsNotEmpty({ message: 'Username should not Empty' })
  readonly studentName?: string;

  @IsEmail()
  readonly email?: string;

  @IsString()
  @IsNotEmpty({ message: 'password should not Empty' })
  @MinLength(5, { message: 'Password is should not be short' })
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly class?: string;

  @IsString()
  @IsOptional()
  readonly school?: string;

  studentpic?: string;

  @IsNotEmpty({ message: 'User Id must be required' })
  readonly createdBy?: Types.ObjectId;
}
