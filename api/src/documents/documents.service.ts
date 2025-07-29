// src/documents/documents.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document, DocumentStatus } from './entities/document.entity';
import { FindPendingDocumentsDto } from './dto/find-pending-documents.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async findPending(queryDto: FindPendingDocumentsDto) {
    const { page = 1, limit = 10, employeeId, documentTypeId } = queryDto;

    const query = this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.employee', 'employee') // Carrega os dados do colaborador
      .leftJoinAndSelect('document.documentType', 'documentType') // Carrega os dados do tipo de documento
      .where('document.status = :status', { status: DocumentStatus.PENDING });

    // Adiciona filtros se eles forem fornecidos
    if (employeeId) {
      query.andWhere('employee.id = :employeeId', { employeeId });
    }

    if (documentTypeId) {
      query.andWhere('documentType.id = :documentTypeId', { documentTypeId });
    }

    // Aplica a paginação
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async submit(id: string): Promise<Document> {
    const document = await this.documentRepository.findOneBy({ id });

    if (!document) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }

    // Opcional: Adicionar lógica para não submeter um documento que não está pendente
    // if (document.status !== DocumentStatus.PENDING) {
    //   throw new ConflictException(`Document is not pending.`);
    // }

    document.status = DocumentStatus.SUBMITTED;
    return this.documentRepository.save(document);
  }

  async remove(id: string): Promise<void> {
    const result = await this.documentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID "${id}" not found`);
    }
  }
}
