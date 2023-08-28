import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import userInfoProvider from "./Context/UserProfile/userInfoProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <userInfoProvider>
        <App />
      </userInfoProvider>
    </AuthProvider>
  </BrowserRouter>
);
