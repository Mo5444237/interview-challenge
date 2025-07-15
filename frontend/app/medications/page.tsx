"use client";

import AddMedicationModel from "@/components/pages/medications/AddMedicationModal";
import MedicationCard from "@/components/pages/medications/MedicationCard";
import { useMedications } from "@/lib/api/medications/useMutation";
import React from "react";

export default function MedicationsPage() {
	const { data: medications, isLoading } = useMedications();

	if (isLoading) {
		return (
			<p className="text-gray-500 text-center">Loading medications...</p>
		);
	} else if (medications?.length === 0) {
		return (
			<div className="text-center p-4">
				<p className="text-gray-500">No medications found.</p>
				<p className="text-gray-500">
					Please add some medications to get started.
				</p>
			</div>
		);
	} else {
		return (
			<>
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-stone-900">
						List of Medications
						<span className="pl-2 text-sm font-semibold text-gray-500">
							({medications?.length} medications)
						</span>
					</h1>
					<AddMedicationModel />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{medications?.map((medication) => (
						<MedicationCard key={medication.id} {...medication} />
					))}
				</div>
			</>
		);
	}
}
