"use client";

export default function AppPage() {
	// Redirect to the patients page
	if (typeof window !== "undefined") {
		window.location.href = "/patients";
	}
	return null;
}
