// src/employees/dto/link-documents.dto.ts
import { IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';

export class LinkDocumentsDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true, message: 'Each value in documentTypeIds must be a valid UUID' })
  documentTypeIds: string[];
}