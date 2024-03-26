import { Fragment, useState } from "react";
import { NavStore, SideNavSubItem, SidenavItem } from "../../models";
import { useNavStore } from "../../store";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { COLORS_THEME } from "../../constants";
import useSideNavItems from "../../hooks/useSideNavItems";

const {
  primary: { main, contrastText },
} = COLORS_THEME;
const selectedColor = "rgba(0,0,0, 0.2)";
export default function SideNav() {
  const { sideNavIsOpen, openSideNav, closeSideNav } =
    useNavStore() as NavStore;
  const [itemIndexSideNav, setItemIndexSideNav] = useState<number | null>(null);
  const [subItemIndexSideNav, setSubItemIndexSideNav] = useState<number | null>(
    null
  );
  const [itemIsOpen, setItemIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const sideNavItems = useSideNavItems();

  const selectedItemSideNav = (
    index: number,
    path: string,
    subItem: boolean = false
  ) => {
    setSubItemIndexSideNav(subItem ? index : null);
    setItemIndexSideNav(subItem ? null : index);
    navigate(path);
    closeSideNav();
  };

  const openItemList = () => setItemIsOpen((state: boolean) => !state);
  return (
    <SwipeableDrawer
      anchor="left"
      onClose={closeSideNav}
      onOpen={openSideNav}
      open={sideNavIsOpen}
      PaperProps={{
        sx: {
          backgroundColor: main,
          color: contrastText,
        },
      }}
    >
      <Box
        sx={{ width: 262, height: "calc(100vh - 74px)" }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingY: "10px",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={closeSideNav}
          >
            <MenuIcon sx={{ color: contrastText, fontSize: "30px" }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <List>
            {sideNavItems.map((item: SidenavItem, index: number) => (
              <Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={index === itemIndexSideNav}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: selectedColor,
                      },
                    }}
                    onClick={() =>
                      item.noView
                        ? openItemList()
                        : selectedItemSideNav(index, item.path)
                    }
                  >
                    {item.icon && (
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={item.label} />
                    {item.badge && (
                      <Badge
                        badgeContent={item.badge.content}
                        color={item.badge.color}
                        sx={{ marginLeft: "auto" }}
                      />
                    )}
                    <>
                      {item.noView && (
                        <>
                          {!itemIsOpen ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </>
                      )}
                    </>
                  </ListItemButton>
                </ListItem>
                <>
                  {item.noView && (
                    <>
                      <Collapse in={itemIsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map(
                            (subItem: SideNavSubItem, index: number) => (
                              <ListItemButton
                                key={index}
                                selected={index === subItemIndexSideNav}
                                onClick={() =>
                                  selectedItemSideNav(index, subItem.path, true)
                                }
                                sx={{
                                  pl: 4,
                                  "&.Mui-selected": {
                                    backgroundColor: selectedColor,
                                  },
                                }}
                              >
                                {subItem.icon && (
                                  <ListItemIcon>
                                    <subItem.icon />
                                  </ListItemIcon>
                                )}
                                <ListItemText primary={subItem.label} />
                              </ListItemButton>
                            )
                          )}
                        </List>
                      </Collapse>
                    </>
                  )}
                </>
              </Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
}
