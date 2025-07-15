import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Medication } from "@/types";
import { toast } from "sonner";

export function useCreateMedication() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newMedication: Partial<Medication>) =>
			apiFetch("/medication", {
				method: "POST",
				body: JSON.stringify(newMedication),
			}),
		onSuccess: () => {
			toast.success("Medication created successfully");
			queryClient.invalidateQueries({ queryKey: ["medications"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to create medication: " + error.message);
			} else {
				toast.error("Failed to create medication: " + error);
			}
		},
	});
}
