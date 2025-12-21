// src/modules/users/user.resolver.ts
import { Resolver, ResolveField, Parent } from "@nestjs/graphql";
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
    // user.id đã là string, không cần new Types.ObjectId()
    return this.profileService.getByUser(user.id);
  }
}