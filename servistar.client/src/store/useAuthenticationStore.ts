import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthenticationStore } from "../models";

export const useAuthenticationStore = create(
  persist<IAuthenticationStore>(
    (set) => ({
      isLoggedIn: false,
      token: "",
      setToken: (token: string) =>
        new Promise((resolve) => {
          set(() => ({
            token,
            isLoggedIn: !!token,
          }));
          resolve();
        }),
    }),
    {
      name: "credentials",
    }
  )
);
