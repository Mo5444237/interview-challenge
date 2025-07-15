"use client";

import React from "react";
import AssignmentCard from "@/components/pages/assignments/AssignmentCard";
import { useAssignmentsByPatient } from "@/lib/api/assignments/useAssignment";
import AddAssignmentModal from "@/components/pages/assignments/AddAssignmentModal";

export default function PatientAssignments({
	params,
}: {
	params: Promise<{ patientId: string }>;
}) {
	const { patientId } = React.use(params);
	const { data: assignments, isLoading } = useAssignmentsByPatient(patientId);

	if (isLoading) {
		return (
			<p className="text-gray-500 text-center">Loading assignments...</p>
		);
	} else if (assignments?.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center p-4 space-y-2">
				<p className="text-gray-500">
					No assignments found for this patient.
				</p>
				<p className="text-gray-500">
					Please add some assignments to get started.
                </p>
                <AddAssignmentModal patientId={patientId} />
			</div>
		);
	} else {
		return (
			<div>
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-stone-900">
						Assignments for{" "}
						{assignments && assignments[0].patient.name}
						<span className="pl-2 text-sm font-semibold text-gray-500">
							({assignments?.length} assignments)
						</span>
                    </h1>
                    <AddAssignmentModal
                        patientId={patientId}
                    />
				</div>
				<div className="space-y-4">
					{assignments?.map((assignment) => (
						<AssignmentCard key={assignment.id} {...assignment} />
					))}
				</div>
			</div>
		);
	}
}
