import { useMemo } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("Token");

  return useMemo(
    () => ({
      isAuthenticated: !!token,
      token,
    }),
    [token],
  );
};

export default useAuth;
