import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Medication } from "@/types";
import { toast } from "sonner";

export function useUpdateMedication() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedMedication: Partial<Medication>) =>
			apiFetch(`/medication/${updatedMedication.id}`, {
				method: "PUT",
				body: JSON.stringify({
					name: updatedMedication.name,
					dosage: updatedMedication.dosage,
					frequency: updatedMedication.frequency,
				}),
			}),
		onSuccess: () => {
			toast.success("Medication updated successfully");
			queryClient.invalidateQueries({ queryKey: ["medications"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to update medication: " + error.message);
			} else {
				toast.error("Failed to update medication: " + error);
			}
		},
	});
}
