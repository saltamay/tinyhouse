import { server } from './server';

export interface State<TData> {
	data: TData | null;
	error: Boolean;
	loading: Boolean;
}

type Action<TData> =
	| { type: 'FETCH' }
	| { type: 'FETCH_SUCCESS'; payload: TData }
	| { type: 'FETCH_ERROR' };

export const reducer =
	<TData>() =>
	(state: State<TData>, action: Action<TData>): State<TData> => {
		switch (action.type) {
			case 'FETCH':
				return { data: null, error: false, loading: true };
			case 'FETCH_SUCCESS':
				return { data: action.payload, error: false, loading: false };
			case 'FETCH_ERROR':
				return { data: null, error: true, loading: false };
			default:
				throw new Error();
		}
	};

export const fetchApi = async <TData = any, TVariables = any>(
	dispatch: React.Dispatch<Action<TData>>,
	query: string,
	variables?: TVariables
) => {
	try {
		dispatch({ type: 'FETCH' });

		const { data, errors } = await server.fetch<TData>({ query, variables });

		if (errors && errors.length) {
			throw new Error(errors[0].message);
		}

		dispatch({ type: 'FETCH_SUCCESS', payload: data });
	} catch (err) {
		dispatch({ type: 'FETCH_ERROR' });
		throw console.error(err);
	}
};
