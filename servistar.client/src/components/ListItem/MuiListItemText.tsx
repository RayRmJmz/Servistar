import { ListItemText, Typography } from "@mui/material";

export type MuiListItemTextProps = {
  label: string;
  information: string;
};

export default function MuiListItemText({
  label,
  information,
}: MuiListItemTextProps) {
  return (
    <ListItemText
      primary={
        <Typography variant="h4" color="primary" fontWeight="bold">
          {information}
        </Typography>
      }
      secondary={
        <Typography variant="body2" component={"span"}>
          {label}
        </Typography>
      }
    />
  );
}
