import { useEffect, useCallback, useReducer } from 'react';
import { reducer, State, fetchApi } from './utils';

interface QueryResult<TData> extends State<TData> {
	refetch: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
	const fetchReducer = reducer<TData>();
	const [state, dispatch] = useReducer(fetchReducer, {
		data: null,
		error: false,
		loading: false,
	});

	const fetch = useCallback(() => {
		fetchApi(dispatch, query);
	}, [query]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		...state,
		refetch: fetch,
	};
};
