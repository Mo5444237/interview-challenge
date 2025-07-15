import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/fetcher";
import { Assignment } from "@/types";

export function useAssignments() {
	return useQuery<Assignment[]>({
		queryKey: ["assignments"],
		queryFn: () => apiFetch("/assignment"),
	});
}

export function useAssignment(assignmentId: string) {
	return useQuery<Assignment>({
		queryKey: ["assignment", assignmentId],
		queryFn: () => apiFetch(`/assignment/${assignmentId}`),
		enabled: !!assignmentId, // Only fetch if assignmentId is provided
	});
}

export function useAssignmentsByPatient(patientId: string) {
	return useQuery<Assignment[]>({
		queryKey: ["assignments", patientId],
		queryFn: () => apiFetch(`/assignment/patient/${patientId}`),
		enabled: !!patientId, // Only fetch if patientId is provided
	});
}
