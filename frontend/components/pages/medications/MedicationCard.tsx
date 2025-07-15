import React from "react";
import formatDate from "@/utils/date-formatter";
import MedicationCardActions from "./MedicationCardActions";
import { Medication } from "@/types";

export default function MedicationCard(medication: Medication) {
	return (
		<div
			className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
			key={medication.id}
		>
			<div className="flex flex-col space-y-2 border-l-3 border-l-amber-500 pl-2">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900">
						{medication.name}
					</h3>
					<MedicationCardActions medication={medication} />
				</div>
				<p className="text-sm text-gray-600">
					Dosage: {medication.dosage}
				</p>
				<p className="text-sm text-gray-600">
					Frequency: {medication.frequency}
				</p>
				<div className="text-xs text-gray-500 flex flex-col space-y-1">
					{medication.createdAt && (
						<p>Created At: {formatDate(medication.createdAt)}</p>
					)}
					{medication.updatedAt && (
						<p>Updated At: {formatDate(medication.updatedAt)}</p>
					)}
				</div>
			</div>
		</div>
	);
}
