import React, { useContext, useEffect } from "react";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import AppRoutes from "./core/routes/routes";
import { GlobalContext } from "./core/context/context";

function App() {

  const globalContext:any = useContext(GlobalContext)

  useEffect(() => {
    const handlePopstate = () => {

      if(window.location.pathname === "/"){
        globalContext.setShowLogin(false);
        globalContext.setShowSignup(false);
        globalContext.setIsLoggedIn(false);
      }
  
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  })

  return (
    <div className="flex flex-col">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
