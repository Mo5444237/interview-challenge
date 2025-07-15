import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Patient } from "@/types";
import { toast } from "sonner";

export function useUpdatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (updatedPatient: Partial<Patient>) =>
			apiFetch(`/patient/${updatedPatient.id}`, {
				method: "PUT",
				body: JSON.stringify({
					name: updatedPatient.name,
					dateOfBirth: updatedPatient.dateOfBirth,
				}),
			}),
		onSuccess: () => {
			toast.success("Patient updated successfully");
			queryClient.invalidateQueries({ queryKey: ["patients"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to update patient: " + error.message);
			} else {
				toast.error("Failed to update patient: " + error);
			}
		},
	});
}
