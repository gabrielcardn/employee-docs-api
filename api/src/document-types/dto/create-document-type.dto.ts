import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({
    description: 'O nome do tipo de documento.',
    example: 'Carteira de Trabalho (CTPS)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}