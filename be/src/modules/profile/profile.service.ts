import { Injectable, BadRequestException } from "@nestjs/common";
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
     GET MY PROFILE
  ========================== */
  async getByUser(userId: string | Types.ObjectId) {
    return this.profileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .lean();
  }

  /* =========================
     CREATE / UPDATE PROFILE (ONBOARDING)
  ========================== */
  async createOrUpdate(data: {
    userId: Types.ObjectId;
    name?: string;
    gender?: string;
    birthday?: string; // ISO
    preferenceGender?: string[];
    interests?: string[];
    habits?: string[];
    photos?: string[];
    location?: {
      type: "Point";
      coordinates: [number, number];
    };
  }) {
    const updateData: Partial<Profile> = {
      name: data.name,
      gender: data.gender,
      preferenceGender: data.preferenceGender ?? [],
      interests: data.interests ?? [],
      habits: data.habits ?? [],
    };

    if (data.birthday) {
      const d = new Date(data.birthday);
      if (!isNaN(d.getTime())) {
        updateData.birthday = d;
      }
    }

    if (data.photos?.length) {
      updateData.photos = data.photos;
      updateData.avatar = data.photos[0]; // 🔥 avatar = ảnh đầu
    }

    if (data.location?.coordinates?.length === 2) {
      updateData.location = data.location;
    }

    const profile = await this.profileModel.findOneAndUpdate(
      { userId: data.userId },
      {
        $set: updateData,
        $setOnInsert: { userId: data.userId },
      },
      {
        new: true,
        upsert: true,
      },
    );

    return profile;
  }

  /* =========================
     UPDATE BASIC PROFILE
  ========================== */
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

  /* =========================
     UPDATE LOCATION
  ========================== */
  async updateLocation(
    userId: string | Types.ObjectId,
    lat: number,
    lng: number,
  ) {
    if (typeof lat !== "number" || typeof lng !== "number") {
      throw new BadRequestException("Invalid coordinates");
    }

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

  /* =========================
     FIND NEARBY PROFILES (SWIPE)
  ========================== */
  async findNearbyProfilesByUser(
    userId: Types.ObjectId,
    maxDistance = 2_000_000,
  ) {
    const me = await this.profileModel
      .findOne({ userId })
      .select("location")
      .lean();

    if (!me?.location?.coordinates) {
      throw new BadRequestException("Profile has no location");
    }

    const [lng, lat] = me.location.coordinates;

    return this.profileModel.aggregate([
      {
        $geoNear: {
          key: "location",
          near: {
            type: "Point",
            coordinates: [lng, lat],
          },
          distanceField: "distance",
          maxDistance,
          spherical: true,
          query: {
            userId: { $ne: userId },
            avatar: { $exists: true, $ne: null }, // 🔥 chỉ profile có ảnh
          },
        },
      },
      {
        $sort: {
          distance: 1,
          createdAt: -1,
        },
      },
      {
        $limit: 50,
      },
    ]);
  }
}
