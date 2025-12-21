import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class HealthResolver {
  @Query(() => String)
  health() {
    return "ok";
  }
}
