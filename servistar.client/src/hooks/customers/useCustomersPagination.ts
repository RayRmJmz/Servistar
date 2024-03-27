import { GridSortDirection } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getCustomersPaginationService } from "../../services";
export default function useCustomerPagination(
  page: number = 0,
  amount: number = 30,
  term?: string,
  orderByColumn?: string,
  orderDirection?: GridSortDirection
) {
  return useQuery({
    queryKey: [
      "customersPagination",
      page++,
      amount,
      term,
      orderByColumn,
      orderDirection,
    ],
    queryFn: () =>
      getCustomersPaginationService({
        page,
        amount,
        term,
        orderByColumn,
        orderDirection,
      }),
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
