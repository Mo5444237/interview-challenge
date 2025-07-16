"use client";

import React from "react";
import AssignmentCard from "@/components/pages/assignments/AssignmentCard";
import { useAssignments } from "@/lib/api/assignments/useAssignment";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function AssignmentsPage() {
	const { data: assignments, isLoading, isError } = useAssignments();

	if (isError) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-red-500">
					Error loading assignments. Please try again.
				</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<p className="text-gray-500 text-center">Loading assignments...</p>
		);
	} else if (assignments?.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center space-y-2 h-full">
				<p className="text-gray-500">No assignments found.</p>
				<p className="text-gray-500">
					Please add some assignments to get started.
				</p>
				<Link
					href={"/patients"}
					className="text-blue-500 hover:underline"
				>
					Navigate to Patients
					<FaExternalLinkAlt
						className="inline ml-1 text-blue-500"
						size={14}
					/>
				</Link>
			</div>
		);
	} else {
		return (
			<>
				<div className="mb-6 flex items-center space-x-2 flex-wrap">
					<h1 className="text-2xl font-bold text-stone-900">
						List of Assignments
					</h1>
					<span className="text-sm font-semibold text-gray-500">
						({assignments?.length} assignments)
					</span>
				</div>
				<div className="flex flex-col space-y-4">
					{assignments?.map((assignment) => (
						<AssignmentCard key={assignment.id} {...assignment} />
					))}
				</div>
			</>
		);
	}
}
