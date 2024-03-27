import { API_SERVICES } from "../../constants";
import { Pagination } from "../../models";
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
