/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/context";

export const PrivateRoute = ({ userRole, children }: any) => {

  const globalContex:any = useContext(GlobalContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "Admin") {
     globalContex.setShowLogin(false)
     globalContex.setShowSignup(false)

      navigate("/");
    }
  }, [userRole, navigate]);


  return userRole === "Admin" ? <>{children}</> : null;
};
