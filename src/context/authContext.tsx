import AuthService from "api/authService";
import React, { useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  //   onLogout: () => void;
  onLogin: (email: string, password: string) => Promise<string>;
  //   onSignUp: (email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  onLogin: async (email: string, password: string) => "",
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => {
  //     const userToken = StorageControl.storageGetter("token");
  //     const userEmail = StorageControl.storageGetter("email");
  //     if (userToken && userEmail) {
  //       setIsLoggedIn(true);
  //     }
  //   }, []);

  const loginHandler = async (email: string, password: string) => {
    try {
      const { data } = await AuthService.logInService(email, password);
      console.log(`authContext: ${data}`);
      //   StorageControl.storageSetter(data.access_token);
      setIsLoggedIn(true);
      return "success";
    } catch (error) {
      console.log(error);
      alert(error);
      return "failed";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
