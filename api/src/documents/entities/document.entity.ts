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

// Vamos criar um Enum para o status, o que é uma prática muito melhor
// do que usar strings soltas. Isso garante consistência.
export enum DocumentStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED', // Extra: pode ser útil no futuro
  REJECTED = 'REJECTED', // Extra: pode ser útil no futuro
}

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Relação: Muitos 'Documents' pertencem a Um 'Employee'.
  // A coluna 'employeeId' será criada automaticamente no banco.
  @ManyToOne(() => Employee, (employee) => employee.documents, {
    onDelete: 'CASCADE', // Se o colaborador for deletado, seus documentos também são.
  })
  employee: Employee;

  // Relação: Muitos 'Documents' são de Um 'DocumentType'.
  // A coluna 'documentTypeId' será criada automaticamente.
  @ManyToOne(() => DocumentType, (documentType) => documentType.documents)
  documentType: DocumentType;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
    default: DocumentStatus.PENDING, // Todo documento já nasce como pendente.
  })
  status: DocumentStatus;

  // Opcional: um campo para armazenar o caminho do arquivo, caso um dia
  // a aplicação precise de upload de verdade. Por agora, pode ser nulo.
  @Column({ type: 'varchar', nullable: true })
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}