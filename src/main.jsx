import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import UserInfoProvider from "./Context/UserProfile/UserInfoProvider";
import ExpenceCtxProvider from "./Context/ExpenceContext/ExpenceCtxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <UserInfoProvider>
        <ExpenceCtxProvider>
          <App />
        </ExpenceCtxProvider>
      </UserInfoProvider>
    </AuthProvider>
  </BrowserRouter>
);
