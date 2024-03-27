import { Box, Typography } from "@mui/material";

export type NoRowsProps = {
  itemName?: string;
};

export default function NoRows({ itemName }: NoRowsProps) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">
        No se encontraron {itemName || "resultados"}.
      </Typography>
    </Box>
  );
}
