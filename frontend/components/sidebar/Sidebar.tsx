"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { Menu } from "lucide-react"; // or any icon you like
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"; // from shadcn

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
		<>
			{/* Mobile toggle button */}
			<div className="lg:hidden p-4 bg-stone-900 text-white">
				<Sheet>
					<SheetTrigger asChild>
						<button title="Toggle Sidebar" type="button">
							<Menu size={24} />
						</button>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="w-64 bg-stone-900 text-white p-6 rounded-r-3xl shadow-lg border-none"
					>
						<SheetHeader className="p-0">
							<SheetTitle>
								<Link
									href="/"
									className="flex items-center mb-6"
								>
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
							</SheetTitle>
							<SheetDescription className="hidden">
								Track your medications with ease using Oxyera.
							</SheetDescription>
						</SheetHeader>
						<nav>
							<ul className="space-y-2">
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
					</SheetContent>
				</Sheet>
			</div>

			{/* Sidebar for desktop */}
			<aside className="hidden lg:flex flex-col w-64 bg-stone-900 shadow-md h-screen rounded-r-3xl p-6">
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
					<ul className="space-y-2">
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
			</aside>
		</>
	);
}
