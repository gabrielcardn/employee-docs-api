import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class LinkDocumentsDto {
  @ApiProperty({
    description: 'Uma lista de IDs (UUIDs) dos tipos de documento a serem vinculados ao colaborador.',
    example: [
      'a1b2c3d4-e5f6-7890-1234-567890abcdef',
      'f1e2d3c4-b5a6-9870-1234-567890abcdef',
    ],
    type: [String],
    format: 'uuid',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each value in documentTypeIds must be a valid UUID' })
  documentTypeIds: string[];
}