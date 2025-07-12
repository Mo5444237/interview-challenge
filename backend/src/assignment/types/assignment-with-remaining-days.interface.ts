import { Medication } from 'src/medication/entities/medication.entity';

export interface AssignmentWithRemainingDays {
  id: string;
  medication: Medication;
  startDate: Date;
  days: number;
  remainingDays: number;
}
