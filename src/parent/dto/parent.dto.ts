import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ParentDto {
  @IsString()
  @IsNotEmpty({ message: 'Username should not Empty' })
  readonly parentName: string;

  @IsEmail()
  readonly parentEmail: string;

  @IsString()
  readonly parentRelation: string;

  @IsNotEmpty({ message: 'User Id must be required' })
  readonly studentID: Types.ObjectId;
}
