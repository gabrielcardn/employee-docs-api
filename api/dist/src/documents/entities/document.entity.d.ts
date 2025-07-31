import { Employee } from '../../employees/entities/employee.entity';
import { DocumentType } from '../../document-types/entities/document-type.entity';
export declare enum DocumentStatus {
    PENDING = "PENDING",
    SUBMITTED = "SUBMITTED"
}
export declare class Document {
    id: string;
    employee: Employee;
    documentType: DocumentType;
    status: DocumentStatus;
    filePath: string;
    createdAt: Date;
    updatedAt: Date;
}
