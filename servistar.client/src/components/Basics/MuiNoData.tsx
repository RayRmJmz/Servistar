import { Grid, Typography } from "@mui/material";

export type MuiNoDataProps = {
  title: string;
};

export default function MuiNoData({ title }: MuiNoDataProps) {
  return (
    <Grid container spacing={1} sx={{}} textAlign={"center"}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}
