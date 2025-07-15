import { useCreateAssignment } from "@/lib/api/assignments/useCreateAssignment";
import React from "react";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMedications } from "@/lib/api/medications/useMedication";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AddMedicationModel from "../medications/AddMedicationModal";

interface AddAssignmentModalProps {
	patientId: string;
}

export default function AddAssignmentModal({
	patientId,
}: AddAssignmentModalProps) {
	const [startDateValue, setStartDateValue] = React.useState(
		new Date().toISOString().split("T")[0]
	);
	const [daysValue, setDaysValue] = React.useState(1);
	const [medicationId, setMedicationId] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);

	const { data: medications } = useMedications();
	const { mutate: addAssignment, isPending } = useCreateAssignment();

	const handleAdd = async () => {
		if (!startDateValue || isNaN(Date.parse(startDateValue))) {
			toast.error("Valid start date is required");
			return;
		}
		if (daysValue <= 0 || isNaN(daysValue)) {
			toast.error("Days must be a positive number");
			return;
		}
		if (!medicationId) {
			toast.error("Medication is required");
			return;
		}

		addAssignment(
			{
				patientId,
				medicationId,
				startDate: new Date(startDateValue).toISOString(),
				days: daysValue,
			},
			{
				onSuccess: () => {
					setIsOpen(false);
					setStartDateValue(new Date().toISOString().split("T")[0]);
					setDaysValue(1);
					setMedicationId("");
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="bg-sky-500 hover:bg-sky-600 transition-colors duration-200 cursor-pointer text-white flex items-center space-x-1 hover:text-white"
				>
					<p>Add New Assignment</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit Assignment</DialogTitle>
					<DialogDescription>
						Update the assignment details below.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4">
					<div>
						<Label htmlFor="startDate">Start Date</Label>
						<Input
							id="startDate"
							type="date"
							value={startDateValue}
							onChange={(e) => setStartDateValue(e.target.value)}
							className="mt-1"
						/>
					</div>
					<div>
						<Label htmlFor="days">Days</Label>
						<Input
							id="days"
							type="number"
							min={1}
							value={daysValue}
							onChange={(e) =>
								setDaysValue(Number(e.target.value))
							}
							className="mt-1"
						/>
					</div>
					<div>
						<Label htmlFor="medication">Medication</Label>
						<div className="mt-1 flex items-center space-x-2">
							<Select onValueChange={setMedicationId}>
								<SelectTrigger className="mt-1 w-full">
									<SelectValue placeholder="Select Medication" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{medications?.map((medication) => (
											<SelectItem
												key={medication.id}
												value={medication.id}
												onSelect={() =>
													setMedicationId(
														medication.id
													)
												}
											>
												{medication.name} -{" "}
												{medication.dosage} (
												{medication.frequency})
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<span className="text-gray-500 text-xs font-semibold">
								OR
							</span>
							<AddMedicationModel displayTitle="add new" />
						</div>
					</div>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleAdd}>
						{isPending ? "Adding..." : "Add Assignment"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
