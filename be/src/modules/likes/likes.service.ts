import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Like } from "./likes.schema";
import { Match } from "@/modules/matches/matches.schema";

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name)
    private readonly likeModel: Model<Like>,

    @InjectModel(Match.name)
    private readonly matchModel: Model<Match>,
  ) {}

  /**
   * Swipe RIGHT (Like)
   * @returns { matched: boolean, matchId?: string }
   */
  async likeUser(
    fromUserId: string,
    toUserId: string,
  ): Promise<{ matched: boolean; matchId?: string }> {
    const fromUser = new Types.ObjectId(fromUserId);
    const toUser = new Types.ObjectId(toUserId);

    // ❌ Không cho like chính mình
    if (fromUser.equals(toUser)) {
      return { matched: false };
    }

    /* ======================
       1️⃣ LƯU LIKE (nếu chưa có)
    ====================== */
    try {
      await this.likeModel.create({
        fromUser,
        toUser,
      });
    } catch (err) {
      // duplicate key → đã like trước đó
    }

    /* ======================
       2️⃣ CHECK LIKE NGƯỢC
    ====================== */
    const reverseLike = await this.likeModel.findOne({
      fromUser: toUser,
      toUser: fromUser,
    });

    if (!reverseLike) {
      return { matched: false };
    }

    /* ======================
       3️⃣ ĐÃ MATCH → TẠO MATCH
    ====================== */
    const users = [fromUser, toUser].sort((a, b) =>
      a.toString().localeCompare(b.toString()),
    );

    // tránh tạo match trùng
    const existingMatch = await this.matchModel.findOne({
      users,
    });

    if (existingMatch) {
      return {
        matched: true,
        matchId: existingMatch._id.toString(),
      };
    }

    const match = await this.matchModel.create({
      users,
    });

    return {
      matched: true,
      matchId: match._id.toString(),
    };
  }

  /* ======================
     SWIPE LEFT (DISLIKE)
     (optional – có thể lưu hoặc bỏ qua)
  ====================== */
  async dislikeUser(
    fromUserId: string,
    toUserId: string,
  ): Promise<boolean> {
    // nếu muốn lưu dislike → tạo collection riêng
    return true;
  }
}
