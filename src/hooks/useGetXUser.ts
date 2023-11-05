import { fetchConnectedXUser } from "@/services/rest/rewards/user";
import useSwr from "swr";
export const useGetXUser = () => {
  const { data, error, isLoading } = useSwr("/auth/user", fetchConnectedXUser);

  return {
    user: data,
    error,
    isLoading,
  };
};
