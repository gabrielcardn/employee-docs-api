import {
  Controller,
  Param,
  Delete,
  ParseUUIDPipe,
  Patch,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FindPendingDocumentsDto } from './dto/find-pending-documents.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('pending')
  @ApiOperation({ summary: 'Lista todos os documentos pendentes com filtros e paginação' })
  @ApiResponse({ status: 200, description: 'Lista de documentos pendentes retornada com sucesso.' })
  findPending(@Query() queryDto: FindPendingDocumentsDto) {
    return this.documentsService.findPending(queryDto);
  }

  @Patch(':id/submit')
  @ApiOperation({ summary: 'Submete um documento (muda o status para SUBMITTED)' })
  @ApiResponse({ status: 200, description: 'Documento submetido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado.' })
  submit(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.submit(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desvincula/deleta um registro de documento' })
  @ApiResponse({ status: 204, description: 'Documento desvinculado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.remove(id);
  }
}