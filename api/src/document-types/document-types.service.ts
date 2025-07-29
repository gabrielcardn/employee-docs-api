import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: Repository<DocumentType>,
  ) {}

  async create(createDocumentTypeDto: CreateDocumentTypeDto): Promise<DocumentType> {
    const documentType = this.documentTypeRepository.create(createDocumentTypeDto);
    return this.documentTypeRepository.save(documentType);
  }

  async findAll(): Promise<DocumentType[]> {
    return this.documentTypeRepository.find();
  }
}