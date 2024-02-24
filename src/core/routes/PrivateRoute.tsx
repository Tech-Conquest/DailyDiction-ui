/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/context";

export const PrivateRoute = ({ userRole, children }: any) => {
  const globalContext: any = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "Admin" || !globalContext.isLoggedIn) {
      globalContext.setShowLogin(false);
      globalContext.setShowSignup(false);

      navigate("/");
    }
  }, [userRole, globalContext.isLoggedIn, navigate]);

  return userRole === "Admin" && globalContext.isLoggedIn ? <>{children}</> : null;
};
