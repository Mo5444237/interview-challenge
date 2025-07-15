import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useCreatePatient } from "@/lib/api/patients/useCreatePatient";

export default function AddPatientModal() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [name, setName] = React.useState("");
	const [dateOfBirth, setDateOfBirth] = React.useState("");
	const [nationalId, setNationalId] = React.useState("");

	const { mutate: createPatient, isPending } = useCreatePatient();

	const handleAddPatient = async () => {
		if (!name) {
			toast.error("Name is required");
			return;
		}
		if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
			toast.error("Valid date of birth is required");
			return;
		}
		if (!nationalId) {
			toast.error("National ID is required");
			return;
		}

		createPatient(
			{
				name,
				dateOfBirth: new Date(dateOfBirth).toISOString(),
				nationalId,
			},
			{
				onSuccess: () => {
					setIsOpen(false);
					setName("");
					setDateOfBirth("");
					setNationalId("");
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					title="Add Patient"
					aria-label="Add Patient"
					className="bg-sky-500 hover:bg-sky-600 transition-colors duration-200 cursor-pointer text-white flex items-center space-x-1 hover:text-white"
				>
					<IoIosAddCircleOutline size={20} strokeWidth={20} />
					<p>Add New Patient</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Patient</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a new patient.
					</DialogDescription>
				</DialogHeader>
				<form className="space-y-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							type="text"
							title="Patient Name"
							value={name}
							placeholder="Enter patient name"
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
							value={dateOfBirth}
							placeholder="Enter date of birth"
							className="mt-1"
							onChange={(e) => setDateOfBirth(e.target.value)}
						/>
					</div>
					<div>
						<Label htmlFor="nationalId">National ID</Label>
						<Input
							id="nationalId"
							type="text"
							title="National ID"
							value={nationalId}
							placeholder="Enter national ID"
							className="mt-1"
							onChange={(e) => setNationalId(e.target.value)}
						/>
					</div>
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleAddPatient}>
						{isPending ? "Adding..." : "Add Patient"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
