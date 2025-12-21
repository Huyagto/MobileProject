// 1. Tạo type cho stats
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileStats {
  @Field(() => Int, { defaultValue: 0 })
  totalViews: number;

  @Field(() => Int, { defaultValue: 0 })
  totalLikes: number;

  @Field(() => Int, { defaultValue: 0 })
  totalMatches: number;

  @Field(() => Int, { defaultValue: 0 })
  profileCompletion: number;

  @Field(() => Date, { nullable: true })
  lastActive?: Date;
}

// 2. Export từ models/index.ts
// nếu tạo f