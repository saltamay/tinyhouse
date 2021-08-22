interface Body<TypeVariables> {
	query: string;
	variables?: TypeVariables;
}

interface Error {
	message: string;
}

export const server = {
	fetch: async <TData = any, TypeVariables = any>(
		body: Body<TypeVariables>
	) => {
		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!res.ok) {
			throw new Error('Failed to fetch from server.');
		}

		return res.json() as Promise<{ data: TData; errors: Error[] }>;
	},
};
