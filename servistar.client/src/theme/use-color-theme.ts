import { createTheme } from "@mui/material";
import { useMemo } from "react";
import { getDesignTokens } from "./theme";
import { useThemeStore } from "../store";

export const useColorTheme = () => {
  const { mode, setMode, modeLight } = useThemeStore();
  const modifiedTheme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    setMode,
    modeLight,
  };
};
