"use client";

import React from "react";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AddPatientModal from "@/components/pages/patients/AddPatientModal";
import PatientCard from "@/components/pages/patients/PatientCard";
import { usePatients } from "@/lib/api/patients/usePatient";
import { Input } from "@/components/ui/input";
import debounce from "lodash/debounce";

export default function PatientsPage() {
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
		data: patients,
		isLoading,
		isError,
	} = usePatients(debouncedSearchTerm);

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-red-500">
					Error loading patients. Please try again.
				</p>
			</div>
		);
	}

	if (isLoading) {
		return <p className="text-gray-500 text-center">Loading...</p>;
	} else if (patients?.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-gray-500">No patients found.</p>
				<p className="text-gray-500">
					Please add some patients to get started.
				</p>
				<AddPatientModal />
			</div>
		);
	} else {
		return (
			<div>
				<div className="mb-6 flex items-center space-x-2 flex-wrap">
					<h1 className="text-2xl font-bold text-stone-900">
						List of Patients
					</h1>
					{patients && patients.length > 0 && (
						<span className="text-sm font-semibold text-gray-500">
							({patients.length} patients)
						</span>
					)}
				</div>
				<div className="flex items-center justify-between mb-4 flex-wrap gap-4">
					<Input
						type="text"
						placeholder="Search patients..."
						className="placeholder:font-semibold border-2 w-[400px] max-w-full"
						onChange={(e) => {
							setSearchTerm(e.target.value);
							debouncedSearch(e.target.value);
						}}
						value={searchTerm}
					/>
					<AddPatientModal />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-stone-900 font-semibold">
								Name
							</TableHead>
							<TableHead className="text-stone-900 font-semibold">
								Date of Birth
							</TableHead>
							<TableHead className="text-stone-900 font-semibold">
								National ID
							</TableHead>
							<TableHead className="text-stone-900 font-semibold">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patients?.map((patient) => (
							<PatientCard key={patient.id} patient={patient} />
						))}
					</TableBody>
				</Table>
			</div>
		);
	}
}
