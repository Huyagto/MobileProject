// src/modules/users/user.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  phone: string;
  
  // Explicitly declare timestamps
  createdAt: Date;
  updatedAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);