import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUpdateAssignment } from "@/lib/api/assignments/useUpdateAssignment";

interface EditAssignmentModalProps {
	assignmentId: string;
	startDate: string;
	days: number;
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
}

export default function EditAssignmentModal({
	assignmentId,
	startDate,
	days,
	isEditing,
	setIsEditing,
}: EditAssignmentModalProps) {
	const [startDateValue, setStartDateValue] = React.useState(startDate);
	const [daysValue, setDaysValue] = React.useState(days);

	const { mutate: updateAssignment, isPending } = useUpdateAssignment();

	const handleEdit = async () => {
		if (!startDateValue || isNaN(Date.parse(startDateValue))) {
			toast.error("Valid start date is required");
			return;
		}
		if (daysValue <= 0 || isNaN(daysValue)) {
			toast.error("Days must be a positive number");
			return;
		}

		// Check if the original data has changed to avoid unnecessary updates
		if (startDateValue === startDate && daysValue === days) {
			toast.info("No changes made to the assignment data");
			setIsEditing(false);
			return;
		}

		updateAssignment(
			{
				id: assignmentId,
				startDate: new Date(startDateValue).toISOString(),
				days: daysValue,
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
							value={
								new Date(startDateValue)
									.toISOString()
									.split("T")[0]
							}
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
				</form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleEdit}>
						{isPending ? "Updating..." : "Update Assignment"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
