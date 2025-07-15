import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { Medication } from '../medication/entities/medication.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AssignmentWithRemainingDays } from './types/assignment-with-remaining-days.interface';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Medication)
    private readonly medicationRepository: Repository<Medication>,
  ) {}

  async create(assignmentData: CreateAssignmentDto): Promise<Assignment> {
    const patient = await this.patientRepository.findOne({
      where: { id: assignmentData.patientId },
    });
    const medication = await this.medicationRepository.findOne({
      where: { id: assignmentData.medicationId },
    });

    if (!patient || !medication) {
      throw new NotFoundException('Invalid patient or medication');
    }

    const assignment = this.assignmentRepository.create({
      ...assignmentData,
      patient,
      medication,
      startDate: new Date(assignmentData.startDate),
    });

    return this.assignmentRepository.save(assignment);
  }

  async findAll(): Promise<Assignment[]> {
    
    const assignments = await this.assignmentRepository.find({
      relations: ['patient', 'medication'],
    });

    if (!assignments.length) {
      throw new NotFoundException('No assignments found');
    }

    return assignments.map((assignment) => ({
      ...assignment,
      remainingDays: this.calculateRemainingDays(
        assignment.startDate,
        assignment.days,
      )
    }));
  }

  async findByPatientId(
    patientId: string,
  ): Promise<AssignmentWithRemainingDays[]> {
    const assignments = await this.assignmentRepository.find({
      where: { patient: { id: patientId } },
    });

    if (!assignments.length)
      throw new NotFoundException(
        `No assignments found for patient ID ${patientId}`,
      );

    return assignments.map((assignment) => ({
      id: assignment.id,
      medication: assignment.medication,
      patient: assignment.patient,
      startDate: assignment.startDate,
      days: assignment.days,
      remainingDays: this.calculateRemainingDays(
        assignment.startDate,
        assignment.days,
      ),
    }));
  }

  async findOne(id: string) {
    const assignment = await this.assignmentRepository.findOneBy({ id });
    if (!assignment)
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    return assignment;
  }

  async update(
    id: string,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.findOne(id);

    if (updateAssignmentDto.patientId) {
      const patient = await this.patientRepository.findOneBy({
        id: updateAssignmentDto.patientId,
      });

      if (!patient)
        throw new NotFoundException(
          `Patient with ID ${updateAssignmentDto.patientId} not found`,
        );

      assignment.patient = patient;
    }

    if (updateAssignmentDto.medicationId) {
      const medication = await this.medicationRepository.findOneBy({
        id: updateAssignmentDto.medicationId,
      });

      if (!medication)
        throw new NotFoundException(
          `Medication with ID ${updateAssignmentDto.medicationId} not found`,
        );
      assignment.medication = medication;
    }

    if (updateAssignmentDto.startDate)
      assignment.startDate = new Date(updateAssignmentDto.startDate);

    if (updateAssignmentDto.days) assignment.days = updateAssignmentDto.days;

    return this.assignmentRepository.save(assignment);
  }

  async remove(id: string) {
    const result = await this.assignmentRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Assignment with ID ${id} not found`);
  }

  calculateRemainingDays(startDate: Date, days: number): number {
    const today = new Date();
    const end = new Date(startDate);
    end.setDate(end.getDate() + days);
    const diff = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return Math.max(0, diff);
  }
}
