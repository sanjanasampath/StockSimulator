import React, { useState, useEffect } from "react";
import {
  loginService,
  registerService,
  logoutService,
  getUser,
} from "../services/auth";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  if (!AuthContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return React.useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage(null, "token");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      getUser()
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setToken(null);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setToken(null);
      // check if the page alery login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const user = await loginService(username, password);
      setUser(user.user);
      setToken(user.token);
      return user.user;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const user = await registerService(username, email, password);
      return user;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, token, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
