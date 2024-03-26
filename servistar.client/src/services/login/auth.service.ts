import { API_SERVICES } from "../../constants";
import { IToken, ILoginAuth } from "../../models";
import http from "../../utils/http/http";

export const authService = async (dataRequest: ILoginAuth) => {
  try {
    const { data } = await http.post<IToken>(
      `${API_SERVICES.AUTH}/login`,
      dataRequest
    );

    return data;
  } catch (ex) {
    throw ex;
  }
};
