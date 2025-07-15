import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Patient } from "@/types";
import { toast } from "sonner";

export function useCreatePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (newPatient: Partial<Patient>) =>
			apiFetch("/patient", {
				method: "POST",
				body: JSON.stringify(newPatient),
			}),
		onSuccess: () => {
			toast.success("Patient created successfully");
			queryClient.invalidateQueries({ queryKey: ["patients"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to create patient: " + error.message);
			} else {
				toast.error("Failed to create patient: " + error);
			}
		},
	});
}
