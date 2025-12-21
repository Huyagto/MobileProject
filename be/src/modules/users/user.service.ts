import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /* ======================
     FIND BY PHONE
  ====================== */
  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone });
  }

  /* ======================
     CREATE USER
  ====================== */
  async create(data: { phone: string }): Promise<UserDocument> {
    const user = new this.userModel({
      phone: data.phone,
      createdAt: new Date(),
    });

    return user.save();
  }

  /* ======================
     FIND BY ID (DÙNG SAU)
  ====================== */
  async findById(id: string | Types.ObjectId) {
    return this.userModel.findById(id);
  }
}
