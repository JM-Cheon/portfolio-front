import AuthService from "api/authService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAuthMutation = () => {
  const navigate = useNavigate();

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
        const {
          data,
          data: { accessToken },
        } = user.data;
        console.log(data);
        console.log(`useAuthMutation: ${accessToken}`);
        // StorageControl.storageSetter(token);
        // navigate("/todo");
      },
    });
  };

  return { useLoginMutate };
};

export default useAuthMutation;
