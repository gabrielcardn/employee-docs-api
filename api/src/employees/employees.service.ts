// src/employees/employees.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Document } from '../documents/entities/document.entity'; // <-- Importe a entidade Document
import { LinkDocumentsDto } from './dto/link-documents.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    // Precisamos do repositório de Document também
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // O preload primeiro busca o funcionário pelo ID e depois mescla os novos dados nele.
    // Isso garante que estamos atualizando uma entidade que existe.
    const employee = await this.employeeRepository.preload({
      id: id,
      ...updateEmployeeDto,
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return this.employeeRepository.save(employee);
  }

  async remove(id: string): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
  }

    async linkDocuments(employeeId: string, linkDocumentsDto: LinkDocumentsDto): Promise<void> {
    // 1. Verifica se o colaborador existe
    const employee = await this.findOne(employeeId); // Reutilizamos o método que já tínhamos

    const { documentTypeIds } = linkDocumentsDto;

    // 2. Cria uma lista de novas instâncias de Document
    const documentsToCreate = documentTypeIds.map((typeId) => {
      return this.documentRepository.create({
        employee: employee, // Associa ao colaborador encontrado
        documentType: { id: typeId }, // Associa ao tipo de documento pelo ID
        // O status 'PENDING' já é o padrão definido na entidade, então não precisamos especificar
      });
    });

    // 3. Salva todos os novos documentos no banco de uma vez
    await this.documentRepository.save(documentsToCreate);
  }

  async getDocumentationStatus(id: string): Promise<Employee> {
    // Usamos a opção 'relations' para dizer ao TypeORM para carregar
    // as entidades relacionadas 'documents' e 'documents.documentType'.
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: {
        documents: {
          documentType: true, // Isso faz um JOIN para trazer os dados do tipo de documento
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return employee;
  }
}