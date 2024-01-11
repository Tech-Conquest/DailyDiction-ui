import React from "react";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
