import {
  Resolver,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { Types } from "mongoose";

import { UserType } from "./user.type";
import { Profile } from "@/modules/profile/profile.type";
import { ProfileService } from "@/modules/profile/profile.service";

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @ResolveField(() => Profile, { nullable: true })
  profile(@Parent() user: UserType) {
    return this.profileService.getByUser(
      new Types.ObjectId(user.id),
    );
  }
}
