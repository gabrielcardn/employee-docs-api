// src/employees/employees.module.ts
import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Document } from '../documents/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Document])], // <-- Garanta que esta linha exista
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
