import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ROLES, ROUTES, LABELS } from "../constants";
import ConstructionIcon from "@mui/icons-material/Construction";
import { SidenavItem } from "../models";
import useCredentials from "./useCredentials";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
export default function useSideNavItems() {
  const { roles } = useCredentials();
  /*
  const getAssistantRequestPath = replacePathParams(
    ROUTES.TEST,
    ":idUser",
    `${id}`
  );*/

  const items: SidenavItem[] = [
    {
      label: LABELS.HOME,
      path: ROUTES.HOME,
      icon: HomeIcon,
      noView: false,
      subItems: [],
      roles: [...Object.values(ROLES)],
    },
    {
      label: LABELS.CUSTOMERS,
      path: ROUTES.CUSTOMERS,
      icon: GroupsIcon,
      noView: false,
      subItems: [],
      roles: [ROLES.ADMI, ROLES.ADMI],
    },
    {
      label: LABELS.SERVICES,
      path: ROUTES.TEST,
      icon: ConstructionIcon,
      noView: false,
      subItems: [],
      roles: [ROLES.ADMI, ROLES.ADMI],
    },

    {
      label: "Recepcionistas",
      path: ROUTES.TEST,
      icon: SupportAgentIcon,
      noView: false,
      subItems: [],
      roles: [ROLES.ADMI, ROLES.ADMI],
    },
  ];

  const itemsToShowBaseOnRoles = items.filter((item) =>
    item.roles.some((role) => roles.includes(role))
  );

  return itemsToShowBaseOnRoles;
}
