import { Document } from '../../documents/entities/document.entity';
export declare class Employee {
    id: string;
    name: string;
    cpf: string;
    hiredAt: Date;
    documents: Document[];
    createdAt: Date;
    updatedAt: Date;
}
