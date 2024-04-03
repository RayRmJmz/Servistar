import { ListItemText } from "@mui/material";

export type MuiListItemTextProps = {
  label: string;
  information: string;
};

export default function MuiListItemText({
  label,
  information,
}: MuiListItemTextProps) {
  return <ListItemText primary={information} secondary={label} />;
}
