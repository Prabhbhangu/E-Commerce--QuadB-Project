import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedComponent = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin === "true") {
    return <>{children}</>;
  } else if (isAdmin === "false") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default ProtectedComponent;
