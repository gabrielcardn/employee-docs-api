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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Employees') 
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo colaborador' })
  @ApiResponse({ status: 201, description: 'O colaborador foi criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos no corpo da requisição.' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Post(':id/documents')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Vincula um ou mais tipos de documento a um colaborador' })
  @ApiResponse({ status: 204, description: 'Documentos vinculados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
  linkDocuments(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() linkDocumentsDto: LinkDocumentsDto,
  ) {
    return this.employeesService.linkDocuments(id, linkDocumentsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os colaboradores' })
  @ApiResponse({ status: 200, description: 'Lista de colaboradores retornada com sucesso.' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id/documentation')
  @ApiOperation({ summary: 'Obtém o status de todos os documentos de um colaborador' })
  @ApiResponse({ status: 200, description: 'Status da documentação retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
  getDocumentationStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.getDocumentationStatus(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um colaborador específico pelo ID' })
  @ApiResponse({ status: 200, description: 'Dados do colaborador retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um colaborador' })
  @ApiResponse({ status: 200, description: 'Colaborador atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta um colaborador' })
  @ApiResponse({ status: 204, description: 'Colaborador deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeesService.remove(id);
  }
}