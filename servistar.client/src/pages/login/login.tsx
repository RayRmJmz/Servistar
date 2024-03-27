import {
  Avatar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ILoginAuth } from "../../models";
import { authValidationSchema } from "../../utils/validationsSchemas/auth.validation";
import { useEffect, useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useError from "../../hooks/useError";
import useAuthentication from "../../hooks/useAuthentication";
import { requestLoginAdapter } from "../../adapters";
import { LABELS, ROUTES } from "../../constants";
import LoginIcon from "@mui/icons-material/Login";
import theme from "../../theme/theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthenticationStore } from "../../store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, error: errorLogin, isLoading } = useAuthentication();
  const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { ErrorAlert, setError } = useError();
  const initialValues: ILoginAuth = {
    userName: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(authValidationSchema),
  });

  const onSubmit: SubmitHandler<ILoginAuth> = (data: ILoginAuth) =>
    login(requestLoginAdapter(data));

  useEffect(() => {
    setError(errorLogin);
  }, [errorLogin]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.NOT_FOUND);
    }
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundPosition: "center",
        maxWidth: "none",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {LABELS.TITLE}
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <LockPersonIcon />
        </Avatar>
        <Typography component="h1" variant="subtitle1">
          {LABELS.LOG_IN}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              id="userName"
              label="Usuario"
              variant="outlined"
              autoFocus
              {...register("userName")}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              label="Contraseña"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isLoading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              startIcon={<LoginIcon />}
              loadingIndicator="Iniciando sesión"
            >
              Acceder
            </LoadingButton>

            <ErrorAlert />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
