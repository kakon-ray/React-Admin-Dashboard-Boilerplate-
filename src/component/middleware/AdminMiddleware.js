import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminMiddleware = ({ children }) => {
  let location = useLocation();

  const user = localStorage.getItem('admin')

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminMiddleware;