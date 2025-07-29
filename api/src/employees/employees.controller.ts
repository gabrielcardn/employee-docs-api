// src/employees/employees.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode, // Importe o HttpCode
  HttpStatus, // Importe o HttpStatus
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LinkDocumentsDto } from './dto/link-documents.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  // A ROTA PROBLEMÁTICA É ESTA AQUI:
  @Post(':id/documents')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 em vez de 201, mais apropriado para esta ação
  linkDocuments(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() linkDocumentsDto: LinkDocumentsDto,
  ) {
    return this.employeesService.linkDocuments(id, linkDocumentsDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  // ATENÇÃO: Coloque esta rota ANTES de @Get(':id') para evitar conflito de matching.
  // O NestJS lê as rotas de cima para baixo.
  @Get(':id/documentation')
  getDocumentationStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.getDocumentationStatus(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.remove(id);
  }
}
