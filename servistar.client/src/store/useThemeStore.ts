import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IThemeStore } from "../models";
import { createTheme } from "@mui/material";

export const useThemeStore = create(
  persist<IThemeStore>(
    (set) => ({
      modeLight: true,
      mode: "light",
      theme: createTheme(),
      setMode: (newmodeLight: boolean) =>
        new Promise((resolve) => {
          set(() => ({
            modeLight: newmodeLight,
            mode: newmodeLight ? "light" : "dark",
          }));
          resolve();
        }),
    }),
    {
      name: "mode",
    }
  )
);
