export type Patient = {
	id: string;
	name: string;
	dateOfBirth: string;
	nationalId: string;
	createdAt?: string;
	updatedAt?: string;
};

export type Medication = {
	id: string;
	name: string;
	dosage: string;
	frequency: string;
	createdAt?: string;
	updatedAt?: string;
};

export type Assignment = {
	id: string;
	startDate: string;
	days: number;
	remainingDays: number;
	medication: Medication;
	patient: Patient;
	createdAt?: string;
	updatedAt?: string;
};
