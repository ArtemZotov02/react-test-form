import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (data) => {
    const authHeader = "Basic " + btoa(`${data.username}:${data.password}`);

    try {
      const response = await fetch(
        "http://68.183.74.14:4005/api/users/current/",
        {
          method: "GET",
          headers: {
            Authorization: authHeader,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.detail);
      } else {
        setError("");
        localStorage.setItem(
          "user",
          JSON.stringify({authHeader })
        );
        navigate("/emails");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (data) => {
    try {
      const response = await fetch("http://68.183.74.14:4005/api/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.username[0]);
      } else {
        setError("");
        await login({ username: data.username, password: data.password });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return { login, register, logout, setError, error };
};
