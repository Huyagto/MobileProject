// src/common/graphql/graphql-custom.module.ts
import { Module } from '@nestjs/common';
import { UploadScalar } from '../scalars/upload.scalar';

@Module({
  providers: [UploadScalar],
  exports: [UploadScalar],
})
export class GraphQLCustomModule {}  // Renamed to avoid confusion