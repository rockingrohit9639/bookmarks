import { useState } from "react";
import constate from "constate";
import { UserDataType } from "../types/User";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDataType>();

  const setAuthenticated = (payload: boolean) => setIsAuthenticated(payload);
  const setUserContent = (payload: UserDataType) => setUser(payload);

  return { isAuthenticated, setAuthenticated, user, setUserContent };
};

export const [AuthProvider, useAuthContext] = constate(useAuthentication);
