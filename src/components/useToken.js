import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.jwt;
  };

  const getUser = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.user;
  };
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));

    setToken(userToken.jwt);
    setUser(userToken.user);
  };

  return {
    setToken: saveToken,
    token,
    user,
  };
}
