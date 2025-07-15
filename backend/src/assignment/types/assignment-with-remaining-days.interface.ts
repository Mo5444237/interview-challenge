import { Medication } from 'src/medication/entities/medication.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export interface AssignmentWithRemainingDays {
  id: string;
  medication: Medication;
  patient: Patient;
  startDate: Date;
  days: number;
  remainingDays: number;
}
