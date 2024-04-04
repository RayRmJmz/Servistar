import { Divider } from "@mui/material";

export type MuiDividerProps = {
  title: string;
};

export default function MuiDivider({ title }: MuiDividerProps) {
  return <Divider textAlign="left"> {title}</Divider>;
}
