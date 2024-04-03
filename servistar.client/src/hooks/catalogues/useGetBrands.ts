import { useQuery } from "@tanstack/react-query";
import { getAllBrandService } from "../../services";

export default function useGetBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrandService,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
