import { REWARDS_BASE_URL } from "@/services/rest/rewards";
import { fetchConnectedXUser } from "@/services/rest/rewards/user";
import useSwr from "swr";
export const useXAuthentication = () => {
  const { user, isAuthenticated, error, isLoading } = useGetXUser();

  const loginRoute = `${REWARDS_BASE_URL}auth/twitter`;
  const logouteRoute = `${REWARDS_BASE_URL}auth/logout`;

  const handleLogin = () => {
    window.location.href = loginRoute;
  };
  const handleLogout = () => {
    window.location.href = logouteRoute;
  };

  return {
    user,
    loginRoute,
    logouteRoute,
    handleLogin,
    handleLogout,
    isAuthenticated,
    error,
    isLoading,
  };
};

export const useGetXUser = () => {
  const { data, error, isLoading } = useSwr("/auth/user", fetchConnectedXUser, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      console.log("error", JSON.parse(JSON.stringify(error)));

      if (error.status === 401) return;
      if (error.message === "Network Error") return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const isAuthenticated = !!data?.id;

  return {
    user: data,
    isAuthenticated,
    error,
    isLoading,
  };
};
