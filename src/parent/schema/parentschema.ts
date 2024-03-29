import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Parent {
  @Prop({ required: true })
  parentName: string;

  @Prop({ required: true, unique: true })
  parentEmail: string;

  @Prop({ required: true })
  parentRelation: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Student' })
  studentID: Types.ObjectId;
}
export const ParentSchema = SchemaFactory.createForClass(Parent);
