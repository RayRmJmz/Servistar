import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IToken } from "../models";
import { authService } from "../services";
import { ROUTES } from "../constants";
import { useAuthenticationStore } from "../store/useAuthenticationStore";
import { useState } from "react";

export const responseLoginAdapter = (responseData: IToken): IToken => ({
  token: responseData.token,
});

export default function useAuthentication() {
  const navigation = useNavigate();
  const setToken = useAuthenticationStore((state) => state.setToken);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: login, error } = useMutation({
    mutationFn: authService,
    // change navitation route to redirect home
    onSuccess: (response: IToken) => {
      const { token } = responseLoginAdapter(response);
      setToken(token).then(() => {
        navigation(ROUTES.CUSTOMERS);
      });
    },

    onError: (error) => error,
    onSettled: () => setIsLoading(false),
    onMutate: () => setIsLoading(true),
  });

  return { login, error, isLoading };
}
