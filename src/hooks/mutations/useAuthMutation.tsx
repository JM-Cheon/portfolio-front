import AuthService from "@api/authService";
import { useMutation } from "@tanstack/react-query";
import { StorageControl } from "@utils/localStorage";
import AuthContext from "context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useAuthMutation = () => {
  const navigate = useNavigate();
  const { onSignIn } = useContext(AuthContext);

  const useSignInMutate = ({
    onError,
  }: {
    onError: (message: string) => void;
  }) => {
    return useMutation({
      mutationKey: ["signin"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.signInService(email, password);
      },
      onSuccess: (tokenInfo) => {
        if (!tokenInfo) {
          return onError("Server is not ready...");
        }
        if (tokenInfo.status !== 200) {
          return onError("Email or PW not valid..!");
        }
        const { data } = tokenInfo.data;
        StorageControl.storageSetter("tokenInfo", JSON.stringify(data));
        onSignIn();
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const useSignUpMutate = ({
    onError,
  }: {
    onError: (message: string) => void;
  }) => {
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.signUpService(email, password);
      },
      onSuccess: (result) => {
        if (!result) {
          return onError("Server is not ready...");
        }
        if (result.status !== 201) {
          return onError("Sign-Up Failed..!");
        }

        navigate("/signin");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return { useSignInMutate, useSignUpMutate };
};

export default useAuthMutation;
