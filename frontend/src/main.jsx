import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./features/auth/contexts/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    <ToastContainer position="top-right" />
  </StrictMode>,
);
