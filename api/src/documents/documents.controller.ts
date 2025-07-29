// src/documents/documents.controller.ts
import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  Patch,
  HttpCode,
  HttpStatus,
  Get, // Adicione o Get
  Query, // Adicione o Query
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FindPendingDocumentsDto } from './dto/find-pending-documents.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('pending')
  findPending(@Query() queryDto: FindPendingDocumentsDto) {
    return this.documentsService.findPending(queryDto);
  }

  // Rota para "enviar" o documento
  @Patch(':id/submit')
  submit(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.submit(id);
  }

  // Rota para "desvincular" (deletar) o documento
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.remove(id);
  }
}
