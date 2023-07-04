import AuthService from "@api/authService";
import { useMutation } from "@tanstack/react-query";
import { StorageControl } from "@utils/localStorage";
import AuthContext from "context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useAuthMutation = () => {
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const useLoginMutate = () => {
    return useMutation({
      mutationKey: ["signin"],
      mutationFn: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => {
        return AuthService.logInService(email, password);
      },
      onSuccess: (user) => {
        const { data } = user.data;
        StorageControl.storageSetter("tokenInfo", JSON.stringify(data));
        onLogin();
        navigate("/");
      },
    });
  };

  return { useLoginMutate };
};

export default useAuthMutation;
