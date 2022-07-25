import axios, { AxiosInstance, AxiosResponse } from "axios";
import { UserLoginValues, UserDataType } from "../interfaces/User";

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

export const login = (data: UserLoginValues): Promise<AxiosResponse> =>
  server.post("/auth/signin", data);
