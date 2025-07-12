import { IsUUID, IsDateString, IsInt, Min } from 'class-validator';

export class CreateAssignmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  medicationId: string;

  @IsDateString()
  startDate: string;

  @IsInt()
  @Min(1)
  days: number;
}
