import { useState } from "react";
import { useLoginMutation } from "../../../rtk/authApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, { isLoading, error, data }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await logIn({ email, password }).unwrap();
      if (response && response.token) {
        // Save the JWT token to cookies
        Cookies.set("Token", response.token, { expires: 7 });
        sessionStorage.setItem("Token", response.token);
      }
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      return null;
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
    data,
  };
};

export default useLogin;
