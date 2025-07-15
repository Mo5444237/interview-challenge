import React from "react";
import Image from "next/image";
import logo from "@/public/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";
import Link from "next/link";
import SidebarItem from "./SidebarItem";


const sidebarItems = [
	{
		href: "/patients",
		icon: <FaRegUser size={20} className="text-white" />,
		label: "Patients",
	},
	{
		href: "/medications",
		icon: <GiMedicines size={20} className="text-white" />,
		label: "Medications",
	},
	{
		href: "/assignments",
		icon: <MdAssignmentAdd size={20} className="text-white" />,
		label: "Assignments",
	},
];

export default function Sidebar() {
	return (
		<aside className="w-64 bg-stone-900 shadow-md h-screen rounded-r-3xl">
			<div className="p-6">
				<Link href="/" className="flex items-center mb-6">
					<Image
						src={logo}
						alt="Oxyera Logo"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<span className="ml-3 text-white text-lg font-semibold">
						Oxyera
					</span>
				</Link>
				<nav className="mt-4">
					<ul>
						{sidebarItems.map((item) => (
							<SidebarItem
								key={item.href}
								href={item.href}
								label={item.label}
								icon={item.icon}
							/>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
}
