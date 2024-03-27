import { Box, Button, Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "100px",
        textAlign: "center",
      }}
    >
      <Box></Box>
      <Typography variant="h1" gutterBottom>
        Uups!
      </Typography>
      <Typography variant="h3">Página no encontrada</Typography>
      <Typography variant="subtitle1">
        Lo sentimos, la página que estás buscando no se pudo encontrar.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "15px" }}
        onClick={() => navigate(ROUTES.HOME)}
      >
        Ir inicio
      </Button>
    </Container>
  );
}
