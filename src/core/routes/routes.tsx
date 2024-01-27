import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../../pages/Landing/Landing";
import UploadWord from "../../pages/Upload/UploadNewWord";
import { PrivateRoute } from "./PrivateRoute";

function AppRoutes() {
  
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route
        path="/admin/upload"
        element={
          <PrivateRoute userRole="Admin">
            <UploadWord />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
