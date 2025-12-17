import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { join } from "path";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

  // ✅ 1. BẬT MULTIPART (UPLOAD)
  await app.register(multipart);

  // ✅ 2. SERVE STATIC ẢNH UPLOAD
  await app.register(fastifyStatic, {
    root: join(process.cwd(), "uploads"),
    prefix: "/uploads/",
  });

  // ✅ 3. START SERVER
  await app.listen(3000, "0.0.0.0");
}

bootstrap();
