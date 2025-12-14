import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import { Profile, ProfileDocument } from "./profile.schema";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  /* =========================
     GET PROFILE BY USER
  ========================== */
  async getByUser(userId: string | Types.ObjectId) {
    return this.profileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
  }

  /* =========================
     CREATE OR UPDATE PROFILE
     (dùng cho onboarding / edit profile)
  ========================== */
  async createOrUpdate(data: {
    userId: Types.ObjectId;
    name: string;
    gender: string;
    birthday: string;
    preferenceGender: string;
    interests: string[];
    habit: string;
  }) {
    let profile = await this.profileModel.findOne({
      userId: data.userId,
    });

    if (!profile) {
      profile = new this.profileModel({
        userId: data.userId,
        name: data.name,
        gender: data.gender,
        birthday: data.birthday,
        preferenceGender: data.preferenceGender,
        interests: data.interests,
        habit: data.habit,
      });
    } else {
      profile.name = data.name;
      profile.gender = data.gender;
      profile.birthday = data.birthday;
      profile.preferenceGender = data.preferenceGender;
      profile.interests = data.interests;
      profile.habit = data.habit;
    }

    await profile.save();
    return profile;
  }

  /* =========================
     UPDATE BASIC PROFILE
     (name, gender, bio...)
  ========================== */
  async upsert(
    userId: string | Types.ObjectId,
    data: {
      name?: string;
      gender?: string;
      bio?: string;
    },
  ) {
    return this.profileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: data },
      { new: true, upsert: true },
    );
  }

  /* =========================
     UPDATE LOCATION (GPS)
     ⚠️ lng trước, lat sau
  ========================== */
  async updateLocation(
    userId: string | Types.ObjectId,
    lat: number,
    lng: number,
  ) {
    await this.profileModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [lng, lat], // ❗ thứ tự QUAN TRỌNG
          },
        },
      },
    );

    return true;
  }

  /* =========================
     FIND NEARBY PROFILES
     (CORE MATCH LOGIC)
  ========================== */
  async findNearbyProfiles(params: {
    userId: Types.ObjectId;
    lat: number;
    lng: number;
    maxDistance?: number; // mét
    preferenceGender?: string;
  }) {
    const {
      userId,
      lat,
      lng,
      maxDistance = 5000, // mặc định 5km
      preferenceGender,
    } = params;

    const query: any = {
      userId: { $ne: userId }, // ❌ loại trừ chính mình
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    };

    if (preferenceGender && preferenceGender !== "Tất cả") {
      query.gender = preferenceGender;
    }

    return this.profileModel.find(query).limit(50);
  }
}
