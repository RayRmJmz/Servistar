export interface IAuthenticationStore {
    isLoggedIn: boolean;
    token: string;
    setToken: (token: string) => Promise<void>;
  }
  