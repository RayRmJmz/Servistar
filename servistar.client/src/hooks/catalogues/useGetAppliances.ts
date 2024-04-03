import { useQuery } from "@tanstack/react-query";
import { getAllApplianceService } from "../../services";

export default function useGetAppliances() {
  return useQuery({
    queryKey: ["appliances"],
    queryFn: getAllApplianceService,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
