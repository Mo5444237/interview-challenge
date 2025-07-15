"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
	href: string;
	label: string;
	icon: React.ReactNode;
}

export default function SidebarItem({ href, label, icon }: SidebarItemProps) {
	const pathName = usePathname();
	const isActive = pathName === href;
	return (
		<li className="mb-2">
			<Link
				href={href}
				className={`flex items-center space-x-4 px-4 py-2 rounded-lg text-white hover:bg-sky-700 ${
					isActive && "bg-sky-700"
				}`}
			>
				{icon}
				<p>{label}</p>
			</Link>
		</li>
	);
}
