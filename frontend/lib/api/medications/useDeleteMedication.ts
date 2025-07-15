import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { toast } from "sonner";

export function useDeleteMedication() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (medicationId: string) =>
			apiFetch(`/medication/${medicationId}`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			toast.success("Medication deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["medications"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to delete medication: " + error.message);
			} else {
				toast.error("Failed to delete medication: " + error);
			}
		},
	});
}
