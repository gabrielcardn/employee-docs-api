// src/documents/entities/document.entity.ts
import { Employee } from '../../employees/entities/employee.entity';
import { DocumentType } from '../../document-types/entities/document-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// O Enum de status que define os estados possíveis de um documento.
export enum DocumentStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relação: Muitos 'Documents' pertencem a Um 'Employee'.
  @ManyToOne(() => Employee, (employee) => employee.documents, {
    onDelete: 'CASCADE', // Se o colaborador for deletado, seus registros de documento também são.
  })
  employee: Employee;

  // Relação: Muitos 'Documents' são de Um 'DocumentType'.
  @ManyToOne(() => DocumentType, (documentType) => documentType.documents)
  documentType: DocumentType;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.PENDING, // Todo novo vínculo já nasce como pendente.
  })
  status: DocumentStatus;

  // Campo opcional para o futuro.
  @Column({ type: 'varchar', nullable: true })
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}