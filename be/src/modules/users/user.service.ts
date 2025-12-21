// src/modules/users/user.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByPhone(phone: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ phone });
  }

  async create(data: { phone: string }): Promise<UserDocument> {
    const user = new this.userModel({
      phone: data.phone,
    });
    return user.save();
  }

  // src/modules/users/user.service.ts
async findById(id: string | Types.ObjectId): Promise<UserDocument> {
  const objectId = typeof id === 'string' ? new Types.ObjectId(id) : id;
  const user = await this.userModel.findById(objectId).exec();
  
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  
  return user;
}
}