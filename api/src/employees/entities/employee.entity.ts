// src/employees/entities/employee.entity.ts
import { Document } from '../../documents/entities/document.entity'; // <-- Adicione este import

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// O decorador @Entity() marca esta classe como uma tabela do banco de dados.
// O nome da tabela será o nome da classe em minúsculo: 'employee'.
@Entity()
export class Employee {
  // @PrimaryGeneratedColumn('uuid') cria uma chave primária que gera um UUID automaticamente.
  // Usar UUID é uma ótima prática para evitar adivinhar IDs e para sistemas distribuídos.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column() marca uma propriedade como uma coluna na tabela.
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // A especificação pede um 'document (cpf)', vamos criar como 'cpf'
  @Column({ type: 'varchar', length: 11, unique: true })
  cpf: string;

  // O tipo 'date' é mais apropriado para datas de contratação.
  @Column({ type: 'date' })
  hiredAt: Date;

  // Relação: Um Employee pode ter muitos 'Documents'.
  @OneToMany(() => Document, (document) => document.employee)
  documents: Document[]; // <-- Adicione esta propriedade

  // @CreateDateColumn é um decorador especial que preenche automaticamente
  // a coluna com a data e hora em que o registro foi criado.
  @CreateDateColumn()
  createdAt: Date;

  // @UpdateDateColumn preenche automaticamente a coluna com a data e hora
  // em que o registro foi atualizado pela última vez.
  @UpdateDateColumn()
  updatedAt: Date;
}
