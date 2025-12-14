import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.type";

import { GqlAuthGuard } from "../../common/guards/gql-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";

/**
 * Kiểu user lấy từ JWT
 * (nên thống nhất toàn dự án)
 */
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
     (FE mở app gọi)
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
     (name, gender, bio)
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Profile)
  updateProfile(
    @CurrentUser() user: JwtUser,
    @Args("name", { nullable: true }) name?: string,
    @Args("gender", { nullable: true }) gender?: string,
    @Args("bio", { nullable: true }) bio?: string,
  ) {
    return this.profileService.upsert(user.id, {
      name,
      gender,
      bio,
    });
  }

  /* =========================
     UPDATE LOCATION (GPS)
     FE gọi khi có permission
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  updateLocation(
    @CurrentUser() user: JwtUser,
    @Args("lat") lat: number,
    @Args("lng") lng: number,
  ) {
    return this.profileService.updateLocation(user.id, lat, lng);
  }

  /* =========================
     FIND NEARBY PROFILES
     CORE MATCH QUERY
  ========================== */
  @UseGuards(GqlAuthGuard)
  @Query(() => [Profile])
  nearbyProfiles(
    @CurrentUser() user: JwtUser,
    @Args("lat") lat: number,
    @Args("lng") lng: number,
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
