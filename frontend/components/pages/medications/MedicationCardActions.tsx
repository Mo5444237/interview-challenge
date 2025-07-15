import React from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDropdown } from "react-icons/io";
import { Button } from "@/components/ui/button";
import EditMedicationModel from "./EditMedicationModel";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Medication } from "@/types";
import { useDeleteMedication } from "@/lib/api/medications/useDeleteMedication";

interface MedicationCardActionsProps {
	medication: Medication;
}

export default function MedicationCardActions({
	medication,
}: MedicationCardActionsProps) {
	const [isEditing, setIsEditing] = React.useState(false);
	const [isDeleting, setIsDeleting] = React.useState(false);

	const { mutate: deleteMedication, isPending } = useDeleteMedication();

	const handleDelete = async () => {
		deleteMedication(medication.id, {
			onSuccess: () => {
				setIsDeleting(false);
			},
		});
	};

	return (
		<>
			<EditMedicationModel
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				medication={medication}
			/>

			<AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete the medication and all associated data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="cursor-pointer">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
							onClick={handleDelete}
						>
							{isPending ? "Deleting..." : "Delete"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						title="Actions"
						aria-label="Actions"
						className="flex items-center justify-center"
					>
						<p>Actions</p>
						<IoIosArrowDropdown size={20} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setIsEditing(true)}>
						Edit
					</DropdownMenuItem>

					<DropdownMenuItem
						variant="destructive"
						onClick={() => setIsDeleting(true)}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
