import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Medication } from "@/types";
import { useUpdateMedication } from "@/lib/api/medications/useUpdateMedication";

interface EditMedicationModelProps {
	medication: Medication;
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
}

export default function EditMedicationModel({
	medication,
	isEditing,
	setIsEditing,
}: EditMedicationModelProps) {
	const [name, setName] = React.useState(medication.name);
	const [dosage, setDosage] = React.useState(medication.dosage);
	const [frequency, setFrequency] = React.useState(medication.frequency);

	const { mutate: updateMedication, isPending } = useUpdateMedication();

	const handleEdit = async () => {
		if (!name || !dosage || !frequency) {
			toast.error("All fields are required");
			return;
		}

		// Check if the original data has changed to avoid unnecessary updates
		if (
			name === medication.name &&
			dosage === medication.dosage &&
			frequency === medication.frequency
		) {
			toast.info("No changes made to the medication data");
			setIsEditing(false);
			return;
		}

		updateMedication(
			{ id: medication.id, name, dosage, frequency },
			{
				onSuccess: () => {
					setIsEditing(false);
					toast.success("Medication updated successfully");
				},
				onError: (error) => {
					if (error instanceof Error) {
						toast.error(
							"Failed to update medication: " + error.message
						);
					} else {
						toast.error("Failed to update medication: " + error);
					}
				},
			}
		);
	};

	return (
		<Dialog open={isEditing} onOpenChange={setIsEditing}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Medication</DialogTitle>
					<DialogDescription>
						Update the details of the medication.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							title="Medication Name"
							defaultValue={medication.name}
							className="mt-1"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="dosage">Dosage</Label>
						<Input
							id="dosage"
							type="text"
							title="Dosage"
							defaultValue={medication.dosage}
							className="mt-1"
							onChange={(e) => setDosage(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="frequency">Frequency</Label>
						<Input
							id="frequency"
							type="text"
							title="Frequency"
							defaultValue={medication.frequency}
							className="mt-1"
							onChange={(e) => setFrequency(e.target.value)}
						/>
					</div>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleEdit}>
						{isPending ? "Updating..." : "Update Medication"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
