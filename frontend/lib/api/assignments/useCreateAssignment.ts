import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { toast } from "sonner";

type CreateAssignment = {
	patientId: string;
	medicationId: string;
	dosage: string;
	frequency: string;
};

export function useCreateAssignment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newAssignment: CreateAssignment) =>
			apiFetch("/assignment", {
				method: "POST",
				body: JSON.stringify(newAssignment),
			}),
		onSuccess: () => {
			toast.success("Assignment created successfully");
			queryClient.invalidateQueries({ queryKey: ["assignments"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to create assignment: " + error.message);
			} else {
				toast.error("Failed to create assignment: " + error);
			}
		},
	});
}
