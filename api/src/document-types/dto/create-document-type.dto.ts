// src/document-types/dto/create-document-type.dto.ts
 import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

 export class CreateDocumentTypeDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   name: string;
 }