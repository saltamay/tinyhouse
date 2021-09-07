export interface LogIn {
	id: string | null;
	token: string | null;
	avatar: string | null;
	hasWallet: boolean | null;
	didRequest: boolean;
}

export interface LogInVariables {
	input?: LogInInput | null;
}

export interface LogInInput {
	input: { code: string } | null;
}
