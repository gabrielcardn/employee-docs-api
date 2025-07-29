// src/documents/dto/find-pending-documents.dto.ts
import { IsOptional, IsInt, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPendingDocumentsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transforma o parâmetro da URL (string) em número
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsUUID('4')
  employeeId?: string;

  @IsOptional()
  @IsUUID('4')
  documentTypeId?: string;
}