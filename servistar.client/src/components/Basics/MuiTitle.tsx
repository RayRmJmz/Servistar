import { Typography } from "@mui/material";

export type MuiTitleProps = {
  title: string;
};

export default function MuiTitle({ title }: MuiTitleProps) {
  return (
    <Typography component="h1" variant="h3">
      {title}
    </Typography>
  );
}
