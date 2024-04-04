import { API_SERVICES } from "../../constants";
import { IUsersAdapter, IUsersResponse } from "../../models";
import http from "../../utils/http/http";

export const getAllUsersService = async (): Promise<IUsersAdapter> => {
  const response = await http.get<IUsersResponse[]>(
    `${API_SERVICES.ADMI}/${API_SERVICES.USERS}/All`
  );
  return { users: response.data };
};
