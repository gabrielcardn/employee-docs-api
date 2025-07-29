import { IsString, Length, IsDateString, IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @Length(11, 11, { message: 'CPF must have 11 characters' })
  @IsOptional()
  cpf?: string;

  @IsDateString()
  @IsOptional()
  hiredAt?: Date;
}