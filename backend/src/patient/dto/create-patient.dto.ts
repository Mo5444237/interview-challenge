import { IsNotEmpty, IsDateString, Matches } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @Matches(
    /^[A-Z]{6}[0-9]{2}[A-EHLMPRST]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/,
    {
      message: 'Codice Fiscale must be 16 uppercase alphanumeric characters',
    },
  )
  nationalId: string;
}
