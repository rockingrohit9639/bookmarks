import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LoginDataType, UserDataType } from "../interfaces/User";

const DEV_URL: string = "http://localhost:3333";

export const server: AxiosInstance = axios.create({
  baseURL: DEV_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const signup = (data: UserDataType): Promise<AxiosResponse> =>
  server.post("/auth/signup", data);

export const login = (data: LoginDataType): Promise<AxiosResponse> =>
  server.post("/auth/signin", data);
