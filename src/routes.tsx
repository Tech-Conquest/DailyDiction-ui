import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import UploadWord from "./pages/Upload/UploadNewWord";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/admin/upload" element={<UploadWord />}></Route>
    </Routes>
  );
}

export default AppRoutes;
