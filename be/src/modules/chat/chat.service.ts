import {
  Injectable,
  ForbiddenException,
  Inject,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { PubSub } from "graphql-subscriptions";

import { Conversation } from "./conversation.schema";
import { Message } from "./message.schema";
import { Match } from "@/modules/matches/matches.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private readonly convoModel: Model<Conversation>,

    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,

    @InjectModel(Match.name)
    private readonly matchModel: Model<Match>,

    @Inject("PUB_SUB")
    private readonly pubSub: PubSub,
  ) {}

  /* ======================
     GET / CREATE CONVO
  ====================== */
  async getOrCreateConversation(
    userA: string,
    userB: string,
  ) {
    const users = [
      new Types.ObjectId(userA),
      new Types.ObjectId(userB),
    ].sort((a, b) =>
      a.toString().localeCompare(b.toString()),
    );

    const isMatched = await this.matchModel.findOne({
      users,
      isBlocked: false,
    });

    if (!isMatched) {
      throw new ForbiddenException("Not matched");
    }

    let convo = await this.convoModel.findOne({ users });

    if (!convo) {
      convo = await this.convoModel.create({ users });
    }

    return convo;
  }

  /* ======================
     SEND MESSAGE (🔥 REALTIME)
  ====================== */
  async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
  ) {
    const convo = await this.convoModel.findById(
      conversationId,
    );

    if (!convo) {
      throw new Error("Conversation not found");
    }

    if (
      !convo.users.some((u) =>
        u.equals(new Types.ObjectId(senderId)),
      )
    ) {
      throw new ForbiddenException();
    }

    const msg = await this.messageModel.create({
      conversationId: convo._id,
      sender: new Types.ObjectId(senderId),
      content,
    });

    convo.lastMessage = msg._id;
    await convo.save();

    // 🔥 PUBLISH REALTIME EVENT
    await this.pubSub.publish("MESSAGE_SENT", {
      messageSent: {
        ...msg.toObject(),
        conversationId: convo._id.toString(),
      },
    });

    return msg;
  }

  /* ======================
     MESSAGE LIST
  ====================== */
  async getMessages(conversationId: string) {
    return this.messageModel
      .find({ conversationId })
      .sort({ createdAt: 1 });
  }

  /* ======================
     CHAT LIST
  ====================== */
  async getMyConversations(userId: string) {
    return this.convoModel
      .find({ users: new Types.ObjectId(userId) })
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
  }
}
