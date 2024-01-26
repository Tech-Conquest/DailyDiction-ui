import React, { useState } from "react";
import { GlobalContext } from "./context";

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  return (
    <>
      <GlobalContext.Provider
        value={{
         showLogin,
         setShowLogin,
         showSignup,
         setShowSignup,
         isLoggedIn,
         setIsLoggedIn
        }}
      >
        {children}
      </GlobalContext.Provider>
    </>
  );
}

export default GlobalContextProvider;
