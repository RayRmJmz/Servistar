import { PaletteMode } from "@mui/material";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { COLORS_THEME, INC_COLORS } from "../constants";

const theme = {
  palette: {
    primary: COLORS_THEME.primary,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: COLORS_THEME.primary,
          divider: blue[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: COLORS_THEME.secondary,
          divider: blueGrey[700],
          background: {
            default: INC_COLORS.grayDark,
            paper: INC_COLORS.grayDark,
          },
          text: {
            primary: "#fff",
            secondary: "#fff",
          },
        }),
  },

  typography: {
    fontFamily: "Roboto , sans-serif",
    // fontSize: 14,
  },
});

export default theme;
