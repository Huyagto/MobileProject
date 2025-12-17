import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Float,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { Types } from "mongoose";

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.type";

import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

/* ======================
   TYPES
====================== */
type JwtUser = {
  id: string;
  phone: string;
};

/* ======================
   INPUT TYPES
====================== */
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  /* =========================
     GET MY PROFILE
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Query(() => Profile, { nullable: true })
  myProfile(
    @CurrentUser() user: JwtUser,
  ) {
    return this.profileService.getByUser(
      new Types.ObjectId(user.id),
    );
  }

  /* =========================
     UPDATE BASIC PROFILE
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateProfile(
    @CurrentUser() user: JwtUser,
    @Args("name", { nullable: true }) name?: string,
    @Args("gender", { nullable: true }) gender?: string,
    @Args("bio", { nullable: true }) bio?: string,
  ) {
    return this.profileService.updateBasicProfile(
      new Types.ObjectId(user.id),
      { name, gender, bio },
    );
  }

  /* =========================
     UPDATE LOCATION (GPS)
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateLocation(
    @CurrentUser() user: JwtUser,
    @Args("lat", { type: () => Float }) lat: number,
    @Args("lng", { type: () => Float }) lng: number,
  ) {
    return this.profileService.updateLocation(
      new Types.ObjectId(user.id),
      lat,
      lng,
    );
  }

  /* =========================
     SUBMIT ONBOARDING PROFILE
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  submitOnboardingProfile(
    @CurrentUser() user: JwtUser,
    @Args("name") name: string,
    @Args("gender") gender: string,
    @Args("birthday") birthday: string,
    @Args("preferenceGender", { type: () => [String] })
    preferenceGender: string[],
    @Args("interests", { type: () => [String] })
    interests: string[],
    @Args("habits", { type: () => [String] })
    habits: string[],
    @Args("photos", { type: () => [String] })
    photos: string[],
  ) {
    return this.profileService.createOrUpdate({
      userId: new Types.ObjectId(user.id),
      name,
      gender,
      birthday,
      preferenceGender,
      interests,
      habits,
      photos,
    });
  }

  /* =========================
     FIND NEARBY PROFILES (SWIPE)
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Profile])
  nearbyProfiles(
    @CurrentUser() user: JwtUser,
    @Args("distance", {
      type: () => Int,
      nullable: true,
      defaultValue: 2_000_000,
    })
    distance: number,
  ) {
    return this.profileService.findNearbyProfilesByUser(
      new Types.ObjectId(user.id),
      distance,
    );
  }
}
