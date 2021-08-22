import { useEffect, useState, useCallback } from 'react';
import { server } from './server';

interface State<TData> {
	data: TData | null;
	error: Boolean;
	loading: Boolean;
}

export const useQuery = <TData = any>(query: string) => {
	const [state, setState] = useState<State<TData>>({
		data: null,
		error: false,
		loading: false,
	});

	const fetch = useCallback(() => {
		const fetchApi = async () => {
			try {
				setState({ data: null, error: false, loading: true });

				const { data, errors } = await server.fetch<TData>({ query });

				if (errors && errors.length) {
					throw new Error(errors[0].message);
				}

				setState({ data, error: false, loading: false });
			} catch (err) {
				setState({ data: null, error: true, loading: false });
				throw console.error(err);
			}
		};

		fetchApi();
	}, [query]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		...state,
		refetch: fetch,
	};
};
