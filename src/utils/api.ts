import { TokenData } from "@interfaces/token";
import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const rawTokenInfo = localStorage.getItem("userInfo");
    if (rawTokenInfo) {
      const tokenInfo: TokenData = JSON.parse(rawTokenInfo);
      config.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) => {
    if (error instanceof AxiosError) {
      let errorMessage = "something wrong from server";
      if (error && error.message) {
        errorMessage = error.message;
      }
      console.log(`api : ${errorMessage}`);
      if (error.response) {
        return error.response;
      }
    }
  }
);
