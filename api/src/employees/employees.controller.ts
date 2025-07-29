import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus, 
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

  @Post(':id/documents')
  @HttpCode(HttpStatus.NO_CONTENT)
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
