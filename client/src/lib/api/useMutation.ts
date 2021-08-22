import { useState } from 'react';
import { server } from './server';

interface State<TData> {
	data: TData | null;
	error: Boolean;
	loading: Boolean;
}

type MutationTuple<TData, TVariables> = [
	(variables?: TVariables | undefined) => Promise<void>,
	State<TData>
];

export const useMutation = <TData = any, TVariables = any>(
	query: string
): MutationTuple<TData, TVariables> => {
	const [state, setState] = useState<State<TData>>({
		data: null,
		error: false,
		loading: false,
	});

	const fetch = async (variables?: TVariables) => {
		try {
			setState({ data: null, error: false, loading: true });

			const { data, errors } = await server.fetch<TData, TVariables>({
				query,
				variables,
			});

			if (errors && errors.length) {
				throw new Error(errors[0].message);
			}

			setState({ data, error: false, loading: false });
		} catch (err) {
			setState({ data: null, error: true, loading: false });
			throw console.error(err);
		}
	};

	return [fetch, state];
};
