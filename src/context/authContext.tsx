import React, { useState, useEffect, useContext } from "react";
import { StorageControl } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isSignIn: boolean;
  onSignOut: () => void;
  onSignIn: () => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isSignIn: false,
  onSignOut: () => {},
  onSignIn: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    const tokenInfo = StorageControl.storageGetter("tokenInfo");
    if (tokenInfo) {
      setIsSignIn(true);
    }
  }, []);

  const signOutHandler = () => {
    StorageControl.storageRemover("tokenInfo");
    setIsSignIn(false);
  };

  const signInHandler = () => {
    setIsSignIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isSignIn: isSignIn,
        onSignOut: signOutHandler,
        onSignIn: signInHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
