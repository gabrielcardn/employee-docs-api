import { IsString, IsNotEmpty, Length, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'CPF must have 11 characters' })
  cpf: string;

  @IsDateString()
  @IsNotEmpty()
  hiredAt: Date;
}