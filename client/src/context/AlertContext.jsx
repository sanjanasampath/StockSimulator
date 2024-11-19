import { createContext, useState, useContext } from "react";
import { Alert } from "@material-ui/lab";
const alertContext = createContext({
  alert: {
    open: false,
    message: "",
    severity: "info",
  },
  setAlert: () => { },
});




export default function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  function showAlert(message, severity) {
    setAlert({
      open: true,
      message,
      severity,
    });

    setTimeout(() => {
      setAlert({
        open: false,
        message: "",
        severity: "info",
      });
    }, 3000);
  }

  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {children}
      {alert.open && <div style={{
        padding: "1rem",
        position: "fixed",
        margin: "0 auto",
        display: "flex",
        top: "10%",
        left: "50%",
        transform: "translate(-50%, -10%)",
        fontWeight: "bold",
        zIndex: 1000,
        backgroundColor: "#1ec7d3",
        color: "white",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      }}>
        {alert.message}
      </div>}
    </alertContext.Provider>
  );
}


export const useAlert = () => {
  return useContext(alertContext);
}

