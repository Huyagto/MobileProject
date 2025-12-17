import {
  Controller,
  Post,
  Req,
} from "@nestjs/common";
import type { FastifyRequest } from "fastify";
import { createWriteStream } from "fs";
import { join } from "path";

@Controller("upload")
export class UploadController {
  @Post()
  async upload(@Req() req: FastifyRequest) {
    const data = await req.file(); // 🔥 FASTIFY API

    if (!data) {
      throw new Error("NO_FILE");
    }

    const uploadDir = join(process.cwd(), "uploads");
    const filename = `${Date.now()}-${data.filename}`;
    const filepath = join(uploadDir, filename);

    await new Promise((resolve, reject) => {
      const stream = createWriteStream(filepath);
      data.file.pipe(stream);
      data.file.on("end", resolve);
      data.file.on("error", reject);
    });

    return {
      url: `http://localhost:3000/uploads/${filename}`,
    };
  }
}
