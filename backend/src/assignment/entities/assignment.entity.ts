import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';
import { Medication } from '../../medication/entities/medication.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @ManyToOne(() => Medication, { eager: true })
  medication: Medication;

  @Column()
  startDate: Date;

  @Column()
  days: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
