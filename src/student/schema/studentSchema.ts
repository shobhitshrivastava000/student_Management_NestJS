//Student Schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Student {
  @Prop({ required: true })
  studentName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  studentpic: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Admin' })
  createdBy: Types.ObjectId;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
