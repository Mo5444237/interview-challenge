import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Patient } from "@/types";

export function usePatients(searchTerm?: string) {
	return useQuery<Patient[]>({
		queryKey: ["patients" , searchTerm],
		queryFn: () => apiFetch("/patient?searchTerm=" + encodeURIComponent(searchTerm || "")),
	});
}

export function usePatient(patientId: string) {
	return useQuery<Patient>({
		queryKey: ["patient", patientId],
		queryFn: () => apiFetch(`/patient/${patientId}`),
		enabled: !!patientId, // Only fetch if patientId is provided
	});
}
