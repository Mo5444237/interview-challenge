"use client";

import AddMedicationModel from "@/components/pages/medications/AddMedicationModal";
import MedicationCard from "@/components/pages/medications/MedicationCard";
import { useMedications } from "@/lib/api/medications/useMedication";
import React from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";

export default function MedicationsPage() {
	const [searchTerm, setSearchTerm] = React.useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");

	// Debounce input by 500ms
	const debouncedSearch = React.useMemo(
		() => debounce((val: string) => setDebouncedSearchTerm(val), 500),
		[]
	);
	// Cleanup debounce on unmount
	React.useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, [debouncedSearch]);

	const {
		data: medications,
		isLoading,
		isError,
	} = useMedications(debouncedSearchTerm);

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-red-500">
					Error loading medications. Please try again.
				</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<p className="text-gray-500 text-center">Loading medications...</p>
		);
	} else if (medications?.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-gray-500">No medications found.</p>
				<p className="text-gray-500">
					Please add some medications to get started.
				</p>
				<AddMedicationModel />
			</div>
		);
	} else {
		return (
			<>
				<div className="mb-6 flex items-center space-x-2 flex-wrap">
					<h1 className="text-2xl font-bold text-stone-900">
						List of Medications
					</h1>
					<span className="text-sm font-semibold text-gray-500">
						({medications?.length} medications)
					</span>
				</div>
				<div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
					<Input
						type="text"
						placeholder="Search medications..."
						className="placeholder:font-semibold border-2 w-[400px] max-w-full"
						onChange={(e) => {
							setSearchTerm(e.target.value);
							debouncedSearch(e.target.value);
						}}
						value={searchTerm}
					/>
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
