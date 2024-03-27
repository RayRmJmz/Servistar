import { ReactElement } from "react";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./constants";
import Login from "./pages/login/login";
import NotFound from "./pages/notFound/NotFound";
import { useAuthenticationStore } from "./store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navs from "./components/Navs/Navs";
import Customers from "./pages/customers/Customers";
function App() {
  const { theme } = useThemeContext();
  const isLoggedIn = useAuthenticationStore((state) => state.isLoggedIn);

  const navegacion = (elemento: ReactElement) => {
    if (isLoggedIn) {
      return elemento;
    } else {
      return <Login />;
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className="main-container">
        <Navs />
        <div className="route-container">
          <Routes>
            <Route path={ROUTES.LOGIN} element={navegacion(<Login />)} />
            <Route
              path={ROUTES.CUSTOMERS}
              element={navegacion(<Customers />)}
            />
            <Route path={ROUTES.NOT_FOUND} element={navegacion(<NotFound />)} />
          </Routes>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
