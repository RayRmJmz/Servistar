import { API_SERVICES } from "../../constants";
import { IBrandRequest, IBrandResponse, IBrandsAdapter } from "../../models";
import http from "../../utils/http/http";

export const getAllBrandService = async (): Promise<IBrandsAdapter> => {
  const response = await http.get<IBrandResponse[]>(
    `${API_SERVICES.BRANDS}/all`
  );
  return { brands: response.data };
};

export const postBrandService = async (request: IBrandRequest) => {
  const response = await http.post(`${API_SERVICES.BRANDS}`, request);
  return response?.data;
};
