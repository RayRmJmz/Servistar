import { createTheme } from "@mui/material";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useColorTheme } from "./use-color-theme";
import { IThemeStore } from "../models";

export const ThemeContext = createContext<IThemeStore>({
  mode: "light",
  modeLight: true,
  setMode: async () => {},
  theme: createTheme(),
});

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const value = useColorTheme();
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
