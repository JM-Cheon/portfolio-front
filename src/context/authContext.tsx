import React, { useState, useEffect, useContext } from "react";
import { StorageControl } from "@utils/localStorage";

interface AuthContextType {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenInfo = StorageControl.storageGetter("tokenInfo");
    if (tokenInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    StorageControl.storageRemover("tokenInfo");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
