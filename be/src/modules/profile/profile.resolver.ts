import { Resolver, Query, Mutation, Args, Int, Float } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.type";

import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

type JwtUser = {
  id: string;
  phone: string;
};

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
    return this.profileService.getByUser(user.id);
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
    return this.profileService.updateBasicProfile(user.id, {
      name,
      gender,
      bio,
    });
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
    return this.profileService.updateLocation(user.id, lat, lng);
  }

  /* =========================
     FIND NEARBY PROFILES
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Profile])
  nearbyProfiles(
    @CurrentUser() user: JwtUser,
    @Args("lat", { type: () => Float }) lat: number,
    @Args("lng", { type: () => Float }) lng: number,
    @Args("distance", { type: () => Int, nullable: true })
    distance?: number,
    @Args("preferenceGender", { nullable: true })
    preferenceGender?: string,
  ) {
    return this.profileService.findNearbyProfiles({
      userId: user.id as any,
      lat,
      lng,
      maxDistance: distance,
      preferenceGender,
    });
  }
}
