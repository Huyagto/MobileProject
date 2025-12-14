import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;
}

/* ✅ KIỂU DOCUMENT CHUẨN */
export type UserDocument = User & Document;

/* ✅ SCHEMA – CHỈ KHAI BÁO 1 LẦN */
export const UserSchema = SchemaFactory.createForClass(User);
