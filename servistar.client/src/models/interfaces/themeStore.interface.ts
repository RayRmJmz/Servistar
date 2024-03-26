import { PaletteMode, Theme } from "@mui/material";

export interface IThemeStore {
  modeLight: boolean;
  mode: PaletteMode;
  setMode: (modeLight: boolean) => Promise<void>;
  theme: Theme;
}
