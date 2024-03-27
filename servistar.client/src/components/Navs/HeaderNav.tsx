import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { INC_COLORS, LABELS } from "../../constants";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavStore, useThemeStore } from "../../store";
import { IconAnimation } from "../../styles";
import MuiTooltip from "../MuiTooltip/MuiTooltip";
import useLogout from "../../hooks/useLogout";
import LogOutModal from "../MuiModal/LogOutModal";
import { NavStore } from "../../models";
import MenuIcon from "@mui/icons-material/Menu";
function HeaderNav() {
  const { modeLight, setMode } = useThemeStore();
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const { logout } = useLogout();
  const { openSideNav } = useNavStore() as NavStore;
  const closeSesion = () => {
    logout();
    setOpenLogout(false);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: INC_COLORS.blue,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openSideNav}
            >
              <MenuIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, marginTop: "5px" }}>
              {/* <img
                src={Logo}
                alt="Logo Peña colorada"
                style={{ height: "50px", marginTop: "5px" }}
              /> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Servistar
              </Typography>
            </Box>

            <MuiTooltip
              messageTooltip={
                modeLight ? "Cambiar modo oscuro" : "Cambiar modo claro"
              }
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => {
                  setMode(!modeLight);
                }}
                color="inherit"
              >
                {modeLight ? (
                  <Brightness7Icon sx={IconAnimation} />
                ) : (
                  <Brightness4Icon sx={IconAnimation} />
                )}
              </IconButton>
            </MuiTooltip>

            <Button color="inherit" onClick={() => setOpenLogout(true)}>
              {LABELS.LOG_OUT}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <LogOutModal
        openModal={openLogout}
        setOpenModal={setOpenLogout}
        onAccept={() => closeSesion()}
      />
    </>
  );
}

export default HeaderNav;
