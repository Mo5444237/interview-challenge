import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(patient: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientRepository.findOne({
      where: { nationalId: patient.nationalId },
    });

    if (existingPatient) {
      throw new ConflictException(
        `Patient with national ID ${patient.nationalId} already exists.`,
      );
    }

    const newPatient = this.patientRepository.create(patient);
    return this.patientRepository.save(newPatient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }
    return patient;
  }

  async update(
    id: string,
    patient: Partial<CreatePatientDto>,
  ): Promise<Patient> {
    await this.findOne(id);
    await this.patientRepository.update(id, patient);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const patient = await this.findOne(id);

    // Check if the patient has any assignments before deletion
    const assignments = await this.patientRepository.manager.find(
      'Assignment',
      {
        where: { patient: { id: patient.id } },
      },
    );
    if (assignments.length > 0) {
      throw new ConflictException(
        `Cannot delete patient, please remove assignments first.`,
      );
    }
    await this.patientRepository.remove(patient);
  }
}
