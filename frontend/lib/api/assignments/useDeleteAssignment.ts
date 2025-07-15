import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { toast } from "sonner";

export function useDeleteAssignment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (assignmentId: string) =>
			apiFetch(`/assignment/${assignmentId}`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			toast.success("Assignment deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to delete assignment: " + error.message);
			} else {
				toast.error("Failed to delete assignment: " + error);
			}
		},
	});
}
