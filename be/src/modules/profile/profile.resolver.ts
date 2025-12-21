// src/modules/profile/profile.resolver.ts
import { 
  Resolver, 
  Query, 
  Mutation, 
  Args, 
  Int, 
  Float,
  ResolveField,
  Parent 
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { 
  Profile, 
  ProfileStats, 
  SwipeProfile,
} from "./models";
import { UserType } from "@/modules/users/user.type";
import {
  CreateProfileInput,
  UpdateProfileInput,
  GetProfilesInput,
  UploadPhotoInput,
  ReorderPhotosInput
} from "./dto";
import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { UserService } from "@/modules/users/user.service";// Import from custom scalar
import { UploadScalar } from "@/common/scalars/upload.scalar";

type JwtUser = {
  id: string;
  phone: string;
};

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  /* =========================
     RESOLVE FIELDS
  ========================== */
  @ResolveField(() => UserType)
  async user(@Parent() profile: Profile): Promise<UserType> {
    const profileDoc = await this.profileService.getProfileDocument(profile.id);
    
    const userDoc = await this.userService.findById(profileDoc.userId.toString());
    if (!userDoc) {
      throw new Error(`User not found for profile ${profile.id}`);
    }
    return {
      id: userDoc._id.toString(),
      phone: userDoc.phone,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };
  }

  /* =========================
     QUERIES
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Query(() => Profile, { nullable: true })
  myProfile(@CurrentUser() user: JwtUser) {
    return this.profileService.getByUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SwipeProfile])
  getProfilesToSwipe(
    @CurrentUser() user: JwtUser,
    @Args("input") input: GetProfilesInput,
  ) {
    return this.profileService.getProfilesForSwiping(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Profile])
  nearbyProfiles(
    @CurrentUser() user: JwtUser,
    @Args("lat", { type: () => Float }) lat: number,
    @Args("lng", { type: () => Float }) lng: number,
    @Args("distance", { type: () => Int, defaultValue: 20 }) distance?: number,
    @Args("limit", { type: () => Int, defaultValue: 50 }) limit?: number,
  ) {
    return this.profileService.findNearbyProfiles(
      user.id,
      lat,
      lng,
      distance,
      limit
    );
  }

  /* =========================
     MUTATIONS - PROFILE SETUP
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  createProfile(
    @CurrentUser() user: JwtUser,
    @Args("input") input: CreateProfileInput,
  ) {
    return this.profileService.createProfile(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateProfile(
    @CurrentUser() user: JwtUser,
    @Args("input") input: UpdateProfileInput,
  ) {
    return this.profileService.updateProfile(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateBasicProfile(
    @CurrentUser() user: JwtUser,
    @Args("name", { nullable: true }) name?: string,
    @Args("bio", { nullable: true }) bio?: string,
    @Args("interests", { type: () => [String], nullable: true }) interests?: string[],
    @Args("habits", { type: () => [String], nullable: true }) habits?: string[],
  ) {
    return this.profileService.updateProfile(user.id, {
      name,
      bio,
      interests,
      habits
    });
  }

  /* =========================
     MUTATIONS - PHOTOS
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  async uploadProfilePhoto(
    @CurrentUser() user: JwtUser,
    @Args({ name: 'file', type: () => UploadScalar }) 
    filePromise: Promise<FileUpload>,
    @Args({ name: 'input', type: () => UploadPhotoInput, nullable: true }) 
    input?: UploadPhotoInput,
  ) {
    const file = await filePromise;
    
    const stream = file.createReadStream();
    const chunks: Buffer[] = [];
    
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    const fileObj = {
      buffer,
      originalname: file.filename,
      mimetype: file.mimetype,
      size: buffer.length,
    };

    await this.profileService.uploadPhoto(
      user.id,
      fileObj,
      input?.caption,
    );

    return this.profileService.getByUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  async deleteProfilePhoto(
    @CurrentUser() user: JwtUser,
    @Args("publicId") publicId: string,
  ) {
    await this.profileService.deletePhoto(user.id, publicId);
    return this.profileService.getByUser(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  async reorderPhotos(
    @CurrentUser() user: JwtUser,
    @Args("input") input: ReorderPhotosInput,
  ) {
    await this.profileService.reorderPhotos(user.id, input.photoPublicIds);
    return this.profileService.getByUser(user.id);
  }

  /* =========================
     MUTATIONS - LOCATION
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateLocation(
    @CurrentUser() user: JwtUser,
    @Args("lat", { type: () => Float }) lat: number,
    @Args("lng", { type: () => Float }) lng: number,
  ) {
    return this.profileService.updateLocation(user.id, lat, lng);
  }

  /* =========================
     MUTATIONS - STATUS
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  deactivateProfile(@CurrentUser() user: JwtUser) {
    return this.profileService.deactivateProfile(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  activateProfile(@CurrentUser() user: JwtUser) {
    return this.profileService.activateProfile(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  verifyProfile(@CurrentUser() user: JwtUser) {
    return this.profileService.verifyProfile(user.id);
  }

  /* =========================
     QUERIES - STATS
  ========================== */
  @UseGuards(GqlAuthGuard)
@Query(() => ProfileStats)
async getProfileStats(@CurrentUser() user: JwtUser) {
  return this.profileService.getProfileStats(user.id);
}
}