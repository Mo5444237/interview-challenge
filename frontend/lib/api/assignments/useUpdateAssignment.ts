import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { toast } from "sonner";

type updatedAssignment = {
	id: string;
	startDate: string;
	days: number;
};

export function useUpdateAssignment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedAssignment: updatedAssignment) =>
			apiFetch(`/assignment/${updatedAssignment.id}`, {
				method: "PUT",
				body: JSON.stringify({
					startDate: updatedAssignment.startDate,
					days: updatedAssignment.days,
				}),
			}),
		onSuccess: () => {
			toast.success("Assignment updated successfully");
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to update assignment: " + error.message);
			} else {
				toast.error("Failed to update assignment: " + error);
			}
		},
	});
}
