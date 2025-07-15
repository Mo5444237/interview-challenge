import React from "react";
import formatDate from "@/utils/date-formatter";
import PatientModal from "./EditPatientModal";
import { TableCell, TableRow } from "@/components/ui/table";
import PatientCardActions from "./PatientCardActions";
import { Patient } from "@/types";

export default function PatientCard({ patient }: { patient: Patient }) {
	const [isEditing, setIsEditing] = React.useState(false);

	return (
		<>
			<TableRow key={patient.id}>
				<TableCell className="text-stone-900 font-semibold">
					{patient.name}
				</TableCell>
				<TableCell className="text-gray-500">
					{formatDate(patient.dateOfBirth)}
				</TableCell>
				<TableCell className="text-gray-500">
					{patient.nationalId}
				</TableCell>
				<TableCell className="font-semibold flex items-center justify-between">
					<PatientCardActions
						patientId={patient.id}
						onEdit={() => setIsEditing(true)}
					/>
				</TableCell>
			</TableRow>

			<PatientModal
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				patient={patient}
			/>
		</>
	);
}
