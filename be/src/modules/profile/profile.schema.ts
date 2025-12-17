import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  /* ======================
     RELATION
  ====================== */
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: Types.ObjectId;

  /* ======================
     BASIC INFO
  ====================== */
  @Prop({ trim: true })
  name?: string;

  @Prop({
    enum: ["male", "female", "non_binary", "other"],
  })
  gender?: string;

  @Prop()
  birthday?: Date;

  /* ======================
     MEDIA
  ====================== */
  @Prop({ type: [String], default: [] })
  photos: string[]; // 🔥 URL ảnh (https)

  @Prop()
  avatar?: string; // 🔥 photos[0]

  /* ======================
     PREFERENCES
  ====================== */
  @Prop({ type: [String], default: [] })
  preferenceGender: string[];

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ type: [String], default: [] })
  habits: string[]; // 🔥 FIX TÊN

  /* ======================
     LOCATION
  ====================== */
  @Prop({
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [lng, lat]
    },
  })
  location?: {
    type: "Point";
    coordinates: [number, number];
  };
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

/* ======================
   INDEXES
====================== */
ProfileSchema.index({ location: "2dsphere" });
ProfileSchema.index({ userId: 1 });
