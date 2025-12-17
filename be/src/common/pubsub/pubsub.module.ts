import { Module, Global } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

@Global() // 🔥 QUAN TRỌNG
@Module({
  providers: [
    {
      provide: "PUB_SUB",
      useValue: new PubSub(),
    },
  ],
  exports: ["PUB_SUB"],
})
export class PubSubModule {}
