import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'O nome completo do colaborador.',
    example: 'João da Silva',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O CPF do colaborador, contendo 11 dígitos numéricos, sem pontuação.',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'CPF must have 11 characters' })
  cpf: string;

  @ApiProperty({
    description: 'A data de contratação do colaborador no formato YYYY-MM-DD.',
    example: '2024-01-15',
  })
  @IsDateString()
  @IsNotEmpty()
  hiredAt: Date;
}