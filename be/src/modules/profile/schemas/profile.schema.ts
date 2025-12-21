// src/profiles/schemas/profile.schema.ts (đơn giản)
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ type: Types.ObjectId, ref: "User", required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ type: [String], required: true })
  preferenceGender: string[];

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ type: [String], default: [] })
  habits: string[];

  @Prop({ default: "" })
  bio: string;

  @Prop({
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [0, 0],
    },
  })
  location: {
    type: "Point";
    coordinates: [number, number];
  };

  @Prop({
    type: [{
      url: { type: String, required: true },
      publicId: { type: String },
      order: { type: Number, default: 0 },
      isVerified: { type: Boolean, default: false },
      caption: { type: String, default: "" },
      uploadedAt: { type: Date, default: Date.now }
    }],
    default: [],
  })
  photos: {
    url: string;
    publicId?: string;
    order: number;
    isVerified: boolean;
    caption: string;
    uploadedAt: Date;
  }[];

  @Prop({ default: 0 })
  photoCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: Date.now })
  lastActive: Date;

  @Prop({ type: Number })
  age: number;

  @Prop({ default: false })
  hasPremium: boolean;

  @Prop({ type: Date, default: null })
  premiumUntil: Date | null;

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  popularityScore: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

// Chỉ để indexes, không dùng middleware
ProfileSchema.index({ location: "2dsphere" });
ProfileSchema.index({ lastActive: -1 });