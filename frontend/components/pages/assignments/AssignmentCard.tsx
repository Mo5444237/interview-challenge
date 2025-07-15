import React from "react";
import formatDate from "@/utils/date-formatter";
import { cn } from "@/lib/utils";
import AssignmentCardActions from "./AssignmentCardActions";
import { Assignment } from "@/types";

export default function AssignmentCard(assignment: Assignment) {
	const isAssignmentDone = assignment.remainingDays == 0;

	return (
		<div
			className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
			key={assignment.id}
		>
			{/* Displaying patient details */}
			<div className="flex flex-col space-y-2 border-l-3 border-l-sky-500 pl-2">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900">
						{assignment.patient.name}
					</h3>
					<AssignmentCardActions assignment={assignment} />
				</div>
				<p className="text-sm text-gray-600">
					Date of Birth: {formatDate(assignment.patient.dateOfBirth)}
				</p>
				<p className="text-sm text-gray-600">
					National ID: {assignment.patient.nationalId}
				</p>
			</div>

			{/* separator*/}
			<hr className="my-4 border-gray-200" />

			<div className="flex justify-between">
				<div className="flex flex-col space-y-2 border-l-3 border-l-amber-500 pl-2 flex-1">
					<div className="flex items-center space-x-2 flex-wrap">
						<h3 className="text-lg font-semibold text-stone-900">
							Medication: {assignment.medication.name}
						</h3>
						<span
							className={cn(
								"py-1 px-2 rounded-full text-xs font-medium",
								isAssignmentDone
									? "bg-green-100 text-green-600 hover:bg-green-200 duration-200"
									: "bg-amber-100 text-yellow-600 hover:bg-amber-200 duration-200"
							)}
						>
							{isAssignmentDone ? "Completed" : "In Progress"}
						</span>
						<span className="pl-2 text-xs text-gray-500">
							{isAssignmentDone
								? ""
								: `(${assignment.remainingDays} days left)`}
						</span>
					</div>
					<div className="flex justify-between gap-4 flex-wrap">
						<div className="flex flex-col flex-1 text-nowrap">
							<p className="text-gray-500">
								Dosage: {assignment.medication.dosage}
							</p>
							<p className="text-gray-500">
								Frequency: {assignment.medication.frequency}
							</p>
						</div>
						<div className="flex flex-col flex-1 text-nowrap">
							<p className="text-gray-500">
								Start Date: {formatDate(assignment.startDate)}
							</p>
							<p className="text-gray-500">
								Days: {assignment.days}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
