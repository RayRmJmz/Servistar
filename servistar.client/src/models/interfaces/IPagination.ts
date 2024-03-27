import { GridSortDirection } from "@mui/x-data-grid";

export interface Pagination {
  page: number;
  amount: number;
  term?: string;
  orderByColumn?: string;
  orderDirection?: GridSortDirection;
}
