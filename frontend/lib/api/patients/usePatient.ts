import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Patient } from "@/types";

export function usePatients() {
	return useQuery<Patient[]>({
		queryKey: ["patients"],
		queryFn: () => apiFetch("/patient"),
	});
}

export function usePatient(patientId: string) {
	return useQuery<Patient>({
		queryKey: ["patient", patientId],
		queryFn: () => apiFetch(`/patient/${patientId}`),
		enabled: !!patientId, // Only fetch if patientId is provided
	});
}
