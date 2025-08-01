import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsDateString, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'O nome completo do colaborador.',
    example: 'João da Silva Sauro',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'O CPF do colaborador, contendo 11 dígitos numéricos, sem pontuação.',
    example: '11122233344',
    required: false,
  })
  @IsString()
  @Length(11, 11, { message: 'CPF must have 11 characters' })
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    description: 'A data de contratação do colaborador no formato YYYY-MM-DD.',
    example: '2023-05-20',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  hiredAt?: Date;
}