import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Conversation {
  @Prop({
    type: [Types.ObjectId],
    ref: "User",
    required: true,
  })
  users: Types.ObjectId[]; // [A, B]

  @Prop({
    type: Types.ObjectId,
    ref: "Message",
  })
  lastMessage?: Types.ObjectId;
}

export const ConversationSchema =
  SchemaFactory.createForClass(Conversation);

/* ❗ tránh tạo conversation trùng */
ConversationSchema.index(
  { users: 1 },
  { unique: true },
);
