import { api } from "utils/api";

interface User {
  access_token: string;
}

interface BaseResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface TokenData {
  accessToken: string;
  accessTokenExpiresIn: number;
  grantType: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

const logInService = async (email: string, password: string) => {
  const res = await api.post<BaseResponse<TokenData>>(
    "auth/signin",
    JSON.stringify({ email, password })
  );
  return res;
};

const AuthService = {
  logInService,
};

export default AuthService;
