import { api } from "@utils/api";
import { AxiosResponse } from "@interfaces/axios";
import { TokenData } from "@interfaces/token";

const logInService = async (email: string, password: string) => {
  const res = await api.post<AxiosResponse<TokenData>>(
    "auth/signin",
    JSON.stringify({ email, password })
  );
  return res;
};

const AuthService = {
  logInService,
};

export default AuthService;
