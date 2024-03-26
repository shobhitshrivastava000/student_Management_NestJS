import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  profilepic: string;

  @Prop({ default: 0 })
  role: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
