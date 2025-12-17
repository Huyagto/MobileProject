import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Match } from "./matches.schema";

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name)
    private readonly matchModel: Model<Match>,
  ) {}

  /* ======================
     LẤY MATCH CỦA TÔI
     (TAB MATCH)
  ====================== */
  async getMyMatches(userId: string) {
    const me = new Types.ObjectId(userId);

    return this.matchModel
      .find({
        users: me,
        isBlocked: false,
      })
      .sort({ createdAt: -1 });
  }

  /* ======================
     CHECK 2 USER MATCH CHƯA
  ====================== */
  async isMatched(
    userA: string,
    userB: string,
  ): Promise<boolean> {
    const users = [
      new Types.ObjectId(userA),
      new Types.ObjectId(userB),
    ].sort((a, b) =>
      a.toString().localeCompare(b.toString()),
    );

    const match = await this.matchModel.findOne({
      users,
      isBlocked: false,
    });

    return !!match;
  }

  /* ======================
     BLOCK / UNMATCH
  ====================== */
  async blockMatch(matchId: string, userId: string) {
    const me = new Types.ObjectId(userId);

    return this.matchModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(matchId),
        users: me,
      },
      { isBlocked: true },
      { new: true },
    );
  }
}
