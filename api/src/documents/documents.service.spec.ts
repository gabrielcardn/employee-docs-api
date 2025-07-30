import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Document, DocumentStatus } from './entities/document.entity';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let repository: Repository<Document>;

  const mockRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    repository = module.get<Repository<Document>>(getRepositoryToken(Document));

    jest.clearAllMocks();
  });

  describe('submit', () => {
    it('should submit a pending document successfully', async () => {
      const documentId = 'some-uuid';
      const pendingDocument = {
        id: documentId,
        status: DocumentStatus.PENDING,
      };

      mockRepository.findOneBy.mockReturnValue(pendingDocument);
      mockRepository.save.mockImplementation((doc) => Promise.resolve(doc));

      const result = await service.submit(documentId);

      expect(result.status).toEqual(DocumentStatus.SUBMITTED);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: documentId });
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ status: DocumentStatus.SUBMITTED }),
      );
    });

    it('should throw a NotFoundException if the document does not exist', async () => {
      const documentId = 'non-existent-uuid';
      mockRepository.findOneBy.mockReturnValue(null);

      await expect(service.submit(documentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a document successfully', async () => {
      const documentId = 'some-uuid';
      mockRepository.delete.mockReturnValue({ affected: 1 });

      await service.remove(documentId);

      expect(mockRepository.delete).toHaveBeenCalledWith(documentId);
    });

    it('should throw a NotFoundException when trying to remove a non-existent document', async () => {
      const documentId = 'non-existent-uuid';
      mockRepository.delete.mockReturnValue({ affected: 0 });

      await expect(service.remove(documentId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
