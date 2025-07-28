import { Document } from '../../documents/entities/document.entity';
export declare class DocumentType {
    id: string;
    name: string;
    documents: Document[];
    createdAt: Date;
    updatedAt: Date;
}
