import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Match {
  @Prop({
    type: [Types.ObjectId],
    ref: "User",
    required: true,
  })
  users: Types.ObjectId[]; // [userA, userB]

  @Prop({ default: false })
  isBlocked: boolean;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

/* 🔥 index để query nhanh */
MatchSchema.index({ users: 1 });
