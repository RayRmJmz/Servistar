import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "../../services";

export default function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersService,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
