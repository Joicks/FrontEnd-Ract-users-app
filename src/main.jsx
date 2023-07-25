import React from "react";
import ReactDOM from "react-dom/client";
import { UsersApp } from "./UsersApp";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvide } from "./auth/context/AuthProvide";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvide>
        <UsersApp />
      </AuthProvide>
    </BrowserRouter>
  </React.StrictMode>
);
