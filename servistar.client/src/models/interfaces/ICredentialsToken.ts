export interface CredentialsToken {
  exp: number;
  iat: number;
  nameid: string;
  nbf: number;
  role: string[];
  unique_name: string;
  isRootUser: boolean;
}
