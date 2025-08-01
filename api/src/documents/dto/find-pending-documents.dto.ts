import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPendingDocumentsDto {
  @ApiProperty({
    description: 'O número da página para a paginação.',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({
    description: 'O número de itens por página.',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Filtra os documentos por um ID de colaborador específico.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4')
  employeeId?: string;

  @ApiProperty({
    description:
      'Filtra os documentos por um ID de tipo de documento específico.',
    example: 'f1e2d3c4-b5a6-9870-1234-567890abcdef',
    required: false,
    format: 'uuid',
  })
  @IsOptional()
  @IsUUID('4')
  documentTypeId?: string;
}
