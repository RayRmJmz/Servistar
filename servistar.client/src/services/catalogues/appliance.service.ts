import { API_SERVICES } from "../../constants";
import {
  IApplianceRequest,
  IApplianceResponse,
  IAppliancesAdapter,
} from "../../models";
import http from "../../utils/http/http";

export const getAllApplianceService = async (): Promise<IAppliancesAdapter> => {
  const response = await http.get<IApplianceResponse[]>(
    `${API_SERVICES.APPLIANCES}/all`
  );
  return { appliances: response.data };
};

export const postApplianteService = async (request: IApplianceRequest) => {
  const response = await http.post(`${API_SERVICES.APPLIANCES}`, request);
  return response?.data;
};
