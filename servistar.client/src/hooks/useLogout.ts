import { useNavigate } from "react-router-dom";
import { useAuthenticationStore } from "../store/useAuthenticationStore";
import { ROUTES } from "../constants";

export default function useLogout() {
  const navigation = useNavigate();
  const setToken = useAuthenticationStore((state) => state.setToken);

  const logout = (): void => {
    setToken("").then(() => {
      navigation(ROUTES.LOGIN);
    });
  };

  return { logout };
}
