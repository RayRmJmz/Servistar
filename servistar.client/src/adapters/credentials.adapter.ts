import { Credentials, CredentialsToken } from '../models';

export const credentialsAdapter = ({
	nameid,
	unique_name,
	role,
	isRootUser,
}: CredentialsToken): Credentials => ({
	id: nameid,
	userName: unique_name,
	roles: role,
	isRootUser,
});
