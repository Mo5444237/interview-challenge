import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Medication } from "@/types";

export function useMedications() {
	return useQuery<Medication[]>({
		queryKey: ["medications"],
		queryFn: () => apiFetch("/medication"),
	});
}

export function useMedication(medicationId: string) {
	return useQuery<Medication>({
		queryKey: ["medication", medicationId],
		queryFn: () => apiFetch(`/medication/${medicationId}`),
		enabled: !!medicationId, // Only fetch if medicationId is provided
	});
}
