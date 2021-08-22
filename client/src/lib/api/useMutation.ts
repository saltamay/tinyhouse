import { useReducer } from 'react';
import { reducer, State, fetchApi } from './utils';

type MutationTuple<TData, TVariables> = [
	(variables?: TVariables | undefined) => Promise<void>,
	State<TData>
];

export const useMutation = <TData = any, TVariables = any>(
	query: string
): MutationTuple<TData, TVariables> => {
	const fetchReducer = reducer<TData>();
	const [state, dispatch] = useReducer(fetchReducer, {
		data: null,
		error: false,
		loading: false,
	});

	const fetch = (variables?: TVariables) =>
		fetchApi(dispatch, query, variables);

	return [fetch, state];
};
