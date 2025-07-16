const BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function apiFetch<T>(
	url: string,
	options?: RequestInit
): Promise<T> {
	const res = await fetch(`${BASE_URL}${url}`, {
		headers: { "Content-Type": "application/json" },
		...options,
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || "API Error");
	}

	// If no content to parse
	const contentType = res.headers.get("content-type");
	if (!contentType || !contentType.includes("application/json")) {
		return {} as T; // safely return empty object
	}

	return res.json();
}
