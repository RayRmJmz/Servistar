import { API_SERVICES } from "../../constants";
import { ICustomerRequest, Pagination } from "../../models";
import http from "../../utils/http/http";

export const getCustomersPaginationService = async (pagination: Pagination) => {
  const response = await http.get(
    `${API_SERVICES.CUSTOMERS}/${API_SERVICES.PAGINATION}/${pagination.page}/${pagination.amount}`,
    {
      params: {
        term: pagination?.term,
        orderByColumn: pagination?.orderByColumn,
        orderDirection: pagination?.orderDirection,
      },
    }
  );
  return response?.data;
};
export const postCustomerService = async (request: ICustomerRequest) => {
  const response = await http.post(`${API_SERVICES.CUSTOMERS}`, request);
  return response?.data;
};

export const deactivateCustomerService = async (customerId: number) => {
  const response = await http.delete(`${API_SERVICES.CUSTOMERS}/${customerId}`);
  return response?.data;
};
