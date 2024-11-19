import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import { Login, Register, NotFound, PageTemplate } from "./components";
import UserContext from "./context/UserContext";
import AlertProvider from "./context/AlertContext";
import Axios from "axios";
import config from "./config/Config";
import  "./index.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
        setUserData({ token: undefined, user: undefined });
        return;
      }

      const headers = {
        "x-auth-token": token,
      };

      const tokenIsValid = await Axios.post(
        config.base_url + "/api/auth/validate",
        null,
        {
          headers,
        }
      );

      if (tokenIsValid.data) {
        const userRes = await Axios.get(config.base_url + "/api/auth/user", {
          headers,
        });
        setUserData({
          token,
          user: userRes.data,
        });
      } else {
        setUserData({ token: undefined, user: undefined });
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <AlertProvider>
          <div className={"bg-[#000c0f] text-4xl"}>
            <Routes>
              {userData.user ? (
                <Route path="/" element={<PageTemplate />} />
              ) : (
                <Route path="/" element={<Register />} />
              )}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<NotFound />} />
            </Routes>
          </div>
        </AlertProvider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
