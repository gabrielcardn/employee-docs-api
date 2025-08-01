import { Controller, Get, Post, Body } from '@nestjs/common';
import { DocumentTypesService } from './document-types.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Document Types')
@Controller('document-types')
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo tipo de documento' })
  @ApiResponse({
    status: 201,
    description: 'O tipo de documento foi criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos. O nome já pode existir.',
  })
  create(@Body() createDocumentTypeDto: CreateDocumentTypeDto) {
    return this.documentTypesService.create(createDocumentTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os tipos de documento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de documento retornada com sucesso.',
  })
  findAll() {
    return this.documentTypesService.findAll();
  }
}
