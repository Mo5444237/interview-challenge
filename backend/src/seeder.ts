import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Patient } from './patient/entities/patient.entity';
import { Medication } from './medication/entities/medication.entity';
import { Assignment } from './assignment/entities/assignment.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  // Clean DB
  await dataSource.getRepository(Assignment).clear();
  await dataSource.getRepository(Patient).clear();
  await dataSource.getRepository(Medication).clear();

  const patientRepo = dataSource.getRepository(Patient);
  const medicationRepo = dataSource.getRepository(Medication);
  const assignmentRepo = dataSource.getRepository(Assignment);

  // Patients (with more realistic codice fiscale values)
  const patients = await patientRepo.save([
    {
      name: 'Mario Rossi',
      dateOfBirth: '1985-03-10',
      nationalId: 'RSSMRA85C10H501U',
    },
    {
      name: 'Lucia Bianchi',
      dateOfBirth: '1992-08-22',
      nationalId: 'BNCLCU92M62H501K',
    },
    {
      name: 'Giovanni Verdi',
      dateOfBirth: '1978-11-15',
      nationalId: 'VRDGVN78S15H501C',
    },
    {
      name: 'Anna Neri',
      dateOfBirth: '2000-01-05',
      nationalId: 'NRINNA00A45H501J',
    },
    {
      name: 'Marco Gialli',
      dateOfBirth: '1995-07-30',
      nationalId: 'GLLMRC95L30H501P',
    },
  ]);

  // Medications
  const meds = await medicationRepo.save([
    {
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: '3 times a day',
    },
    {
      name: 'Ibuprofen',
      dosage: '200mg',
      frequency: '2 times a day',
    },
    {
      name: 'Amoxicillin',
      dosage: '250mg',
      frequency: '3 times a day',
    },
    {
      name: 'Metformin',
      dosage: '500mg',
      frequency: '2 times a day',
    },
    {
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'once a day',
    },
    {
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'once a day',
    },
  ]);

  // Assignments
  await assignmentRepo.save([
    {
      patient: patients[0],
      medication: meds[0],
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      days: 7,
    },
    {
      patient: patients[0],
      medication: meds[1],
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      days: 10,
    },
    {
      patient: patients[1],
      medication: meds[2],
      startDate: new Date(),
      days: 5,
    },
    {
      patient: patients[1],
      medication: meds[3],
      startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      days: 14,
    },
    {
      patient: patients[2],
      medication: meds[4],
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      days: 7,
    },
    {
      patient: patients[2],
      medication: meds[5],
      startDate: new Date(),
      days: 30,
    },
    {
      patient: patients[3],
      medication: meds[0],
      startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      days: 10,
    },
    {
      patient: patients[3],
      medication: meds[1],
      startDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      days: 15,
    },
    {
      patient: patients[4],
      medication: meds[2],
      startDate: new Date(),
      days: 20,
    },
    {
      patient: patients[4],
      medication: meds[3],
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      days: 12,
    },
  ]);

  console.log('✅ Database seeded successfully!');
  await app.close();
}

bootstrap();
