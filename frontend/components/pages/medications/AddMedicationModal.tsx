import React from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useCreateMedication } from "@/lib/api/medications/useCreateMedication";

interface AddMedicationModelProps {
	displayTitle?: string;
}

export default function AddMedicationModel({
	displayTitle,
}: AddMedicationModelProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const [dosage, setDosage] = React.useState("");
	const [frequency, setFrequency] = React.useState("");

	const { mutate: addMedication, isPending } = useCreateMedication();

	const handleAdd = async () => {
		if (!name || !dosage || !frequency) {
			toast.error("All fields are required");
			return;
		}

		addMedication(
			{ name, dosage, frequency },
			{
				onSuccess: () => {
					setIsOpen(false);
					setName("");
					setDosage("");
					setFrequency("");
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					title="Add Medication"
					aria-label="Add Medication"
					className="bg-sky-500 hover:bg-sky-600 transition-colors duration-200 cursor-pointer text-white flex items-center space-x-1 hover:text-white"
				>
					{displayTitle ? (
						<span className="text-sm">{displayTitle}</span>
					) : (
						<>
							<IoIosAddCircleOutline size={20} strokeWidth={20} />
							<p>Add New Medication</p>
						</>
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Medication</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a new medication.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							title="Medication Name"
							className="mt-1"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="dosage">Dosage</Label>
						<Input
							id="dosage"
							type="text"
							title="Dosage"
							className="mt-1"
							value={dosage}
							onChange={(e) => setDosage(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="frequency">Frequency</Label>
						<Input
							id="frequency"
							type="text"
							title="Frequency"
							className="mt-1"
							value={frequency}
							onChange={(e) => setFrequency(e.target.value)}
						/>
					</div>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleAdd}>
						{isPending ? "Adding..." : "Add Medication"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
