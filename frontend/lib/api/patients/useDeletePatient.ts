import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { toast } from "sonner";

export function useDeletePatient() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (patientId: string) =>
			apiFetch(`/patient/${patientId}`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			toast.success("Patient deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["patients"] });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast.error("Failed to delete patient: " + error.message);
			} else {
				toast.error("Failed to delete patient: " + error);
			}
		},
	});
}
