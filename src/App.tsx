import React from "react";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import AppRoutes from "./core/routes/routes";

function App() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
