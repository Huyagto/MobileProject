import { MongooseModule } from "@nestjs/mongoose";
import { Profile } from "./profile.schema";
import { ProfileService } from "./profile.service";
import { ProfileResolver } from "./profile.resolver";
import { Module } from "@nestjs/common";
import { ProfileSchema } from "./profile.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService], // 👈 BẮT BUỘC
})
export class ProfileModule {}
