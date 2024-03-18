import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (user) {
        setCurrentUser(user);
        setToken(token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const login = (token, user) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(false);
    navigate("/");
  };

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"));
  }
  , []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setCurrentUser,
        token,
        setToken,
        login,
        logout,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
