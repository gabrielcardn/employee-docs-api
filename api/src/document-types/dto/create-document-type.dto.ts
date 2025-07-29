 import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

 export class CreateDocumentTypeDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   name: string;
 }