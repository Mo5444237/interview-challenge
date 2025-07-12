import { Repository } from 'typeorm';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Medication } from 'src/medication/entities/medication.entity';

describe('AssignmentService - calculateRemainingDays', () => {
  let service: AssignmentService;

  beforeEach(() => {
    // Mock dependencies for AssignmentService constructor
    const mockAssignmentRepository = {} as Repository<Assignment>;
    const mockPatientRepository = {} as Repository<Patient>;
    const mockMedicationRepository = {} as Repository<Medication>;
    service = new AssignmentService(
      mockAssignmentRepository,
      mockPatientRepository,
      mockMedicationRepository,
    );
  });

  it('should return the correct remaining days when treatment is ongoing', () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 3); // started 3 days ago
    const totalDays = 10;

    const remaining = service.calculateRemainingDays(startDate, totalDays);

    expect(remaining).toBe(7);
  });

  it('should return 0 if treatment has ended', () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 15); // started 15 days ago
    const totalDays = 10;

    const remaining = service.calculateRemainingDays(startDate, totalDays);

    expect(remaining).toBe(0); // treatment is over
  });

  it('should return full days if treatment starts today', () => {
    const startDate = new Date(); // today
    const totalDays = 5;

    const remaining = service.calculateRemainingDays(startDate, totalDays);

    expect(remaining).toBe(5);
  });
});
