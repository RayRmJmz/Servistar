import { Typography } from "@mui/material";
export type ErrorFormProps = {
  message?: string;
};

export default function ErrorForm({ message }: ErrorFormProps) {
  return (
    <Typography variant="subtitle2" gutterBottom color="error">
      {message}
    </Typography>
  );
}
