import jwtDecode from "jwt-decode";

import { credentialsAdapter } from "../adapters";
import { Credentials } from "../models";
import { useAuthenticationStore } from "../store";
import { voidCredentials } from "../utils";

export default function useCredentials() {
  const token: string = useAuthenticationStore((state) => state.token);
  const { id, userName, roles, isRootUser }: Credentials = credentialsAdapter(
    token ? jwtDecode(token) : voidCredentials
  );

  return {
    id: id || "",
    userName: userName || "",
    roles: (Array.isArray(roles) ? roles : roles ? [roles] : []).map((role) =>
      role.toLowerCase()
    ),
    isRootUser,
  };
}
