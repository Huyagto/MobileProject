import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop({ type: [String] })
preferenceGender: string[];


  @Prop({ type: [String] })
  interests: string[];

 @Prop({ type: [String] })
habit: string[];
  @Prop({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point",
  },
  coordinates: {
    type: [Number],      // [lng, lat]
    required: true,
    default: [0, 0],     // ✅ FIX QUAN TRỌNG
  },
})
location: {
  type: "Point";
  coordinates: [number, number];
};
}

/* 🔥 SCHEMA */
export const ProfileSchema = SchemaFactory.createForClass(Profile);

/* 🔥 INDEX PHẢI KHAI BÁO Ở ĐÂY – KHÔNG PHẢI TRONG @Prop */
ProfileSchema.index({ location: "2dsphere" });