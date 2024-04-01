//Admin Schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Admin {
  @Prop({ required: true })
  adminname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  profilepic: string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
