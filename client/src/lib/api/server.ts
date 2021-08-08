interface Body<TypeVariables> {
	query: string;
	variables?: TypeVariables;
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

		return res.json() as Promise<{ data: TData }>;
	},
};
