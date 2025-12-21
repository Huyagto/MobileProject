// src/common/scalars/upload.scalar.ts
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Upload')
export class UploadScalar implements CustomScalar<any, any> {
  description = 'File upload scalar type';

  parseValue(value: any) {
    return value;
  }

  serialize(value: any) {
    return value;
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}

// Tạo instance của scalar
export const UploadScalarInstance = new UploadScalar();