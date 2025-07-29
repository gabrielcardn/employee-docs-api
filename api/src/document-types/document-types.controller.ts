import { Controller, Get, Post, Body } from '@nestjs/common';
import { DocumentTypesService } from './document-types.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';

@Controller('document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}

  @Post()
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypesService.create(createDocumentTypeDto);
  }

  @Get()
  findAll() {
    return this.documentTypesService.findAll();
  }
}