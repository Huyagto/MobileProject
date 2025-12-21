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

  async getByUser(userId: string | Types.ObjectId) {
    return this.profileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
  }

  async createOrUpdate(data: {
    userId: Types.ObjectId;
    name: string;
    gender: string;
    birthday: string;
    preferenceGender: string[];
    interests: string[];
    habit: string[];
    location: {
      type: "Point";
      coordinates: [number, number];
    };
  }) {
    let profile = await this.profileModel.findOne({
      userId: data.userId,
    });

    if (!profile) {
      profile = new this.profileModel(data);
    } else {
      profile.name = data.name;
      profile.gender = data.gender;
      profile.birthday = data.birthday;
      profile.preferenceGender = data.preferenceGender;
      profile.interests = data.interests;
      profile.habit = data.habit;

      if (data.location?.coordinates?.length === 2) {
        profile.location = data.location;
      }
    }

    await profile.save();
    return profile;
  }
  async updateBasicProfile(
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
    { new: true },
  );
}

  async updateLocation(
    userId: string | Types.ObjectId,
    lat: number,
    lng: number,
  ) {
    return this.profileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [lng, lat],
          },
        },
      },
      { new: true },
    );
  }

  async findNearbyProfiles(params: {
    userId: Types.ObjectId;
    lat: number;
    lng: number;
    maxDistance?: number;
    preferenceGender?: string;
  }) {
    const {
      userId,
      lat,
      lng,
      maxDistance = 5000,
      preferenceGender,
    } = params;

    const query: any = {
      userId: { $ne: new Types.ObjectId(userId) },
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
