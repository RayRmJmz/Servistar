import { CredentialsToken } from '../models';

export const voidCredentials: CredentialsToken = {
	exp: 0,
	iat: 0,
	nameid: '',
	nbf: 0,
	role: [],
	unique_name: '',
	isRootUser: false,
};
