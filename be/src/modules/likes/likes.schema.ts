import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Like {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  fromUser: Types.ObjectId; // người swipe

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  toUser: Types.ObjectId; // người bị swipe
}

export const LikeSchema = SchemaFactory.createForClass(Like);

/* 🔥 Tránh spam like trùng */
LikeSchema.index(
  { fromUser: 1, toUser: 1 },
  { unique: true }
);
