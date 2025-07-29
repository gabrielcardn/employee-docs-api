import { Document } from '../../documents/entities/document.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DocumentType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nome do tipo de documento, ex: "CPF", "Carteira de Trabalho"
  // Deve ser único para não haver duplicatas.
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  // Relação: Um DocumentType pode estar associado a muitos 'Documents' (entregas).
  // Isso nos permitirá, por exemplo, encontrar todos os CPFs entregues.
  @OneToMany(() => Document, (document) => document.documentType)
  documents: Document[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}