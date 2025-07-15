import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePatient } from "@/lib/api/patients/useUpdatePatient";
import { Patient } from "@/types";
import { toast } from "sonner";

interface EditPatientModalProps {
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	patient: Patient;
}

export default function EditPatientModal({
	isEditing,
	setIsEditing,
	patient,
}: EditPatientModalProps) {
	const [name, setName] = React.useState(patient.name);
	const [dateOfBirth, setDateOfBirth] = React.useState(
		Date.parse(patient.dateOfBirth)
			? new Date(patient.dateOfBirth).toISOString().split("T")[0]
			: ""
	);

	const { mutate: updatePatient, isPending } = useUpdatePatient();

	const handleEdit = async () => {
		if (!name) {
			toast.error("Name is required");
			return;
		}

		if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
			toast.error("Valid date of birth is required");
			return;
		}

		// check if the original data has changed
		// avoid unnecessary updates
		if (
			name === patient.name &&
			dateOfBirth ===
				new Date(patient.dateOfBirth).toISOString().split("T")[0]
		) {
			toast.info("No changes made to the patient data");
			setIsEditing(false);
			return;
		}

		updatePatient(
			{
				id: patient.id,
				name,
				dateOfBirth: new Date(dateOfBirth).toISOString(),
			},
			{
				onSuccess: () => {
					setIsEditing(false);
				},
			}
		);
	};

	return (
		<Dialog open={isEditing} onOpenChange={setIsEditing}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Patient</DialogTitle>
					<DialogDescription>
						Update the patient&apos;s details below.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							title="Patient Name"
							defaultValue={patient.name}
							className="mt-1"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="dob">Date of Birth</Label>
						<Input
							id="dob"
							type="date"
							title="Date of Birth"
							defaultValue={
								Date.parse(patient.dateOfBirth)
									? new Date(patient.dateOfBirth)
											.toISOString()
											.split("T")[0]
									: ""
							}
							className="mt-1"
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleEdit}>
						{isPending ? "Updating..." : "Update Patient"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
