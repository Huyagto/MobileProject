// src/profiles/profile.service.ts
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CloudinaryService } from "../../common/cloud/cloudinary";
import { Profile, ProfileDocument } from "./schemas/profile.schema";
import { CreateProfileInput, GetProfilesInput } from "./dto";

interface MulterFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  /* ======================
     UTILITY METHODS
  ====================== */
  
  private calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return Math.round((R * c) * 10) / 10;
  }

  /* ======================
     GET PROFILE METHODS
  ====================== */
  
  async getByUser(userId: string): Promise<ProfileDocument> {
    const profile = await this.profileModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .exec();
    
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    
    // Tính tuổi nếu chưa có
    if (profile.birthday && !profile.age) {
    profile.age = this.calculateAge(profile.birthday);
    await profile.save(); // SAVE THAY VÌ UPDATEONE
  }
  
  return profile;
  }

  async createProfile(
    userId: string,
    input: CreateProfileInput,
  ): Promise<ProfileDocument> {
    const existingProfile = await this.profileModel.findOne({
      userId: new Types.ObjectId(userId),
    });

    if (existingProfile) {
      throw new BadRequestException('Profile already exists');
    }

    const age = this.calculateAge(input.birthday);
    if (age < 18) {
      throw new BadRequestException('Must be at least 18 years old');
    }

    const profileData = {
      userId: new Types.ObjectId(userId),
      name: input.name.trim(),
      gender: input.gender,
      birthday: new Date(input.birthday),
      age,
      preferenceGender: input.preferenceGender,
      interests: (input.interests || []).slice(0, 10),
      habits: (input.habits || []).slice(0, 5),
      bio: (input.bio || '').substring(0, 500),
      location: {
        type: "Point" as const,
        coordinates: input.coordinates,
      },
      photos: [],
      photoCount: 0,
      isActive: true,
      isVerified: false,
      lastActive: new Date(),
      hasPremium: false,
      premiumUntil: null,
      popularityScore: 0,
    };

    const profile = new this.profileModel(profileData);
    await profile.save();
    
    return profile.toObject();
  }

  async updateProfile(
    userId: string,
    data: {
      name?: string;
      bio?: string;
      interests?: string[];
      habits?: string[];
    }
  ): Promise<ProfileDocument> {
    const updateData: any = {};
    
    if (data.name) updateData.name = data.name.trim();
    if (data.bio) updateData.bio = data.bio.substring(0, 500);
    if (data.interests) updateData.interests = data.interests.slice(0, 10);
    if (data.habits) updateData.habits = data.habits.slice(0, 5);
    
    updateData.lastActive = new Date();

    const updated = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { $set: updateData },
        { new: true, lean: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async uploadPhoto(
    userId: string,
    file: MulterFile,
    caption?: string,
  ): Promise<any[]> {
    const profile = await this.getByUser(userId);
    
    if (profile.photos.length >= 9) {
      throw new BadRequestException('Maximum 9 photos allowed');
    }

    const uploadResult = await this.cloudinaryService.uploadImage(
      file,
      `profiles/${userId}`,
      {
        width: 1080,
        height: 1350,
        crop: 'fill',
        gravity: 'face',
        quality: 'auto',
        format: 'webp'
      }
    )as any;
    const newPhoto = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      order: 0,
      isVerified: false,
      caption: (caption || '').substring(0, 100),
      uploadedAt: new Date(),
    };

    const currentPhotos = profile.photos || [];
    const updatedPhotos = [newPhoto, ...currentPhotos]
      .map((photo, index) => ({
        ...photo,
        order: index
      }));

    const updatedProfile = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        {
          $set: { photos: updatedPhotos },
          $inc: { photoCount: 1 },
          lastActive: new Date(),
        },
        { new: true, lean: true }
      )
      .exec();

    return updatedProfile!.photos;
  }

  async deletePhoto(userId: string, publicId: string): Promise<any[]> {
    const profile = await this.getByUser(userId);
    
    const photoExists = profile.photos.some(p => p.publicId === publicId);
    if (!photoExists) {
      throw new NotFoundException('Photo not found');
    }

    if (profile.photos.length <= 1) {
      throw new BadRequestException('Cannot delete the last photo');
    }

    await this.cloudinaryService.deleteImage(publicId);

    const updatedPhotos = profile.photos
      .filter(p => p.publicId !== publicId)
      .map((photo, index) => ({
        ...photo,
        order: index
      }));

    const updatedProfile = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        {
          $set: { photos: updatedPhotos },
          $inc: { photoCount: -1 },
          lastActive: new Date(),
        },
        { new: true, lean: true }
      )
      .exec();

    return updatedProfile!.photos;
  }

  async reorderPhotos(userId: string, photoPublicIds: string[]): Promise<any[]> {
    const profile = await this.getByUser(userId);
    
    const existingPhotoIds = profile.photos.map(p => p.publicId).filter(Boolean);
    const invalidIds = photoPublicIds.filter(id => !existingPhotoIds.includes(id));
    
    if (invalidIds.length > 0) {
      throw new NotFoundException(`Photos not found: ${invalidIds.join(', ')}`);
    }

    const photoMap = new Map(
      profile.photos.map(photo => [photo.publicId, photo])
    );

    const updatedPhotos = photoPublicIds
      .map((publicId, index) => ({
        ...photoMap.get(publicId)!,
        order: index
      }))
      .filter(photo => photo !== undefined);

    await this.profileModel.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set: { 
          photos: updatedPhotos,
          lastActive: new Date() 
        }
      }
    ).exec();

    return updatedPhotos;
  }

  async updateLocation(
    userId: string,
    lat: number,
    lng: number,
  ): Promise<ProfileDocument> {
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw new BadRequestException('Invalid coordinates');
    }

    const updated = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        {
          $set: {
            location: {
              type: "Point",
              coordinates: [lng, lat],
            },
            lastActive: new Date(),
          },
        },
        { new: true, lean: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  } 
  

  async getProfilesForSwiping(
    userId: string,
    input: GetProfilesInput,
  ): Promise<any[]> {
    const userProfile = await this.getByUser(userId);
    
    const { 
      limit = 20, 
      distance = 50, 
      minAge = 18, 
      maxAge = 100 
    } = input;

    const query: any = {
      userId: { $ne: new Types.ObjectId(userId) },
      isActive: true,
      photoCount: { $gte: 1 },
      gender: { $in: userProfile.preferenceGender },
      age: { $gte: minAge, $lte: maxAge },
      preferenceGender: userProfile.gender,
    };

    const pipeline: any[] = [
      {
        $geoNear: {
          near: userProfile.location,
          distanceField: "distance",
          maxDistance: distance * 1000,
          spherical: true,
          query: query,
        }
      },
      { $sort: { 
        distance: 1, 
        lastActive: -1,
        popularityScore: -1 
      }},
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          age: 1,
          bio: 1,
          gender: 1,
          interests: 1,
          habits: 1,
          photos: { $slice: ["$photos", 6] },
          distance: { $divide: ["$distance", 1000] },
          lastActive: 1,
          isVerified: 1,
          hasPremium: 1,
          popularityScore: 1,
        }
      }
    ];

    // Premium users thấy profiles tốt hơn
    if (userProfile.hasPremium) {
      pipeline.splice(2, 0, {
        $match: { 
          $or: [
            { "photos.isVerified": true },
            { hasPremium: true }
          ]
        }
      });
    }

    const profiles = await this.profileModel.aggregate(pipeline).exec();
    
    return profiles.map(profile => ({
      ...profile,
      distance: profile.distance ? Math.round(profile.distance * 10) / 10 : null
    }));
  }
  
  async findNearbyProfiles(
    userId: string,
    lat: number,
    lng: number,
    maxDistance: number = 20,
    limit: number = 50
  ): Promise<any[]> {
    const userProfile = await this.getByUser(userId);
    
    const profiles = await this.profileModel.find({
      userId: { $ne: new Types.ObjectId(userId) },
      isActive: true,
      photoCount: { $gte: 1 },
      gender: { $in: userProfile.preferenceGender },
      preferenceGender: userProfile.gender,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: maxDistance * 1000,
        },
      },
    })
    .select('name age bio photos interests habits location hasPremium isVerified')
    .limit(limit)
    .lean()
    .exec();

    return profiles.map(profile => ({
      ...profile,
      distance: this.calculateDistance(
        lat,
        lng,
        profile.location.coordinates[1],
        profile.location.coordinates[0]
      )
    }));
  }

  async upgradeToPremium(
    userId: string,
    months: number = 1
  ): Promise<ProfileDocument> {
    const premiumUntil = new Date();
    premiumUntil.setMonth(premiumUntil.getMonth() + months);
    
    const updated = await this.profileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          hasPremium: true,
          premiumUntil,
          lastActive: new Date(),
        },
        $inc: { popularityScore: 10 }
      },
      { new: true, lean: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async downgradeFromPremium(userId: string): Promise<ProfileDocument> {
    const updated = await this.profileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          hasPremium: false,
          premiumUntil: null,
          lastActive: new Date(),
        }
      },
      { new: true, lean: true }
    ).exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async deactivateProfile(userId: string): Promise<ProfileDocument> {
    const updated = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { 
          $set: { 
            isActive: false,
            lastActive: new Date()
          } 
        },
        { new: true, lean: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async activateProfile(userId: string): Promise<ProfileDocument> {
    const updated = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { 
          $set: { 
            isActive: true,
            lastActive: new Date()
          } 
        },
        { new: true, lean: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async verifyProfile(userId: string): Promise<ProfileDocument> {
    const updated = await this.profileModel
      .findOneAndUpdate(
        { userId: new Types.ObjectId(userId) },
        { 
          $set: { 
            isVerified: true,
            lastActive: new Date()
          } 
        },
        { new: true, lean: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException('Profile not found');
    }

    return updated as ProfileDocument;
  }

  async getProfileStats(userId: string): Promise<any> {
    const profile = await this.getByUser(userId);
    
    let completionScore = 0;
    const maxScore = 100;
    
    if (profile.name) completionScore += 20;
    if (profile.photos.length >= 3) completionScore += 30;
    if (profile.photos.length >= 1) completionScore += 10;
    if (profile.bio && profile.bio.length > 10) completionScore += 20;
    if (profile.interests.length > 0) completionScore += 10;
    if (profile.habits.length > 0) completionScore += 10;
    
    return {
      totalPhotos: profile.photoCount,
      profileCompletion: Math.min(completionScore, maxScore),
      lastActive: profile.lastActive,
      hasPremium: profile.hasPremium,
      premiumUntil: profile.premiumUntil,
      isVerified: profile.isVerified,
    };
  }
  // Thêm vào ProfileService (sau createProfile method)
  async getProfileDocument(profileId: string): Promise<ProfileDocument> {
  const profile = await this.profileModel
    .findById(new Types.ObjectId(profileId))
    .exec();
  
  if (!profile) {
    throw new NotFoundException('Profile not found');
  }
  
  return profile;
}
/* ===== CREATE PROFILE WITH PHOTOS (FOR ONBOARDING) ===== */
async createProfileWithPhotos(
  userId: string,
  input: {
    name: string;
    gender: string;
    birthday: string;
    preferenceGender: string;
    interests?: string[];
    habits?: string[];
    bio?: string;
    coordinates: number[];
    photos: Array<{ 
      url: string; 
      publicId?: string; 
      caption: string; 
      order: number 
    }>;
  }
): Promise<ProfileDocument> {
  // Check if profile exists
  const existingProfile = await this.profileModel.findOne({
    userId: new Types.ObjectId(userId),
  });

  if (existingProfile) {
    throw new BadRequestException('Profile already exists');
  }
  const birthdayDate = new Date(input.birthday);
  // Calculate age
  const age = this.calculateAge(birthdayDate);
  if (age < 18) {
    throw new BadRequestException('Must be at least 18 years old');
  }
    const preferenceGenderArray = Array.isArray(input.preferenceGender) 
    ? input.preferenceGender 
    : [input.preferenceGender];
  // Format photos
  const formattedPhotos = input.photos.map(photo => ({
    url: photo.url,
    publicId: photo.publicId,
    order: photo.order,
    isVerified: false,
    caption: photo.caption,
    uploadedAt: new Date(),
  }));

  // Create profile data
  const profileData = {
    userId: new Types.ObjectId(userId),
    name: input.name.trim(),
    gender: input.gender,
    birthday: birthdayDate,
    age,
    preferenceGender: preferenceGenderArray,
    interests: (input.interests || []).slice(0, 10),
    habits: (input.habits || []).slice(0, 5),
    bio: (input.bio || '').substring(0, 500),
    location: {
      type: "Point" as const,
      coordinates: input.coordinates,
    },
    photos: formattedPhotos,
    photoCount: formattedPhotos.length,
    isActive: true,
    isVerified: false,
    lastActive: new Date(),
    hasPremium: false,
    premiumUntil: null,
    popularityScore: 0,
  };

  const profile = new this.profileModel(profileData);
  await profile.save();
  
  return profile.toObject();
}
}
