import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Medication } from 'src/medication/entities/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Patient, Medication])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
