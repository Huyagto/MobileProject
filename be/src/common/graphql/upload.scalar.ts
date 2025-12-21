// upload.scalar.ts
import { Scalar } from "@nestjs/graphql";
import { GraphQLUpload } from "graphql-upload";

@Scalar("Upload")
export class UploadScalar {}
