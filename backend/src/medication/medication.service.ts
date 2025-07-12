import { Injectable, NotFoundException } from '@nestjs/common';
import { Medication } from './entities/medication.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {}

  async findAll(): Promise<Medication[]> {
    return this.medicationRepository.find();
  }

  async finedOne(id: string): Promise<Medication> {
    const medication = await this.medicationRepository.findOne({
      where: { id },
    });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found.`);
    }
    return medication;
  }

  async create(createMedicationDto: CreateMedicationDto): Promise<Medication> {
    const newMedication = this.medicationRepository.create(createMedicationDto);
    return this.medicationRepository.save(newMedication);
  }

  async update(
    id: string,
    updateMedicationDto: UpdateMedicationDto,
  ): Promise<Medication> {
    await this.finedOne(id);
    await this.medicationRepository.update(id, updateMedicationDto);
    return this.finedOne(id);
  }

  async remove(id: string): Promise<void> {
    const medication = await this.finedOne(id);
    await this.medicationRepository.remove(medication);
  }
}
