import { useState } from "react";
import constate from "constate";

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<object>({});

  const setAuthenticated = (payload: boolean) => setIsAuthenticated(payload);
  const setUserContent = (payload: object) => setUser(payload);

  return { isAuthenticated, setAuthenticated, user, setUserContent };
};

export const [AuthProvider, useAuthContext] = constate(useAuthentication);
