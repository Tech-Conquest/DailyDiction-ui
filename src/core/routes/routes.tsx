import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../../pages/Landing/Landing";
import UploadWord from "../../pages/Upload/UploadNewWord";
import { PrivateRoute } from "./PrivateRoute";
import Learn from "../../pages/Learn/Learn";
import ReviewWords from "../../pages/Review/ReviewWords";

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
      <Route
        path="/admin/review"
        element={
          <PrivateRoute userRole="Admin">
            <ReviewWords />
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/learn"
        element={
          <PrivateRoute userRole="Admin">
            <Learn />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}

export default AppRoutes;
