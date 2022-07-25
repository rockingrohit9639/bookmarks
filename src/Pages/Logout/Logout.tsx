import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthentication";

const Logout: React.FC = () => {
  const { setAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    setAuthenticated(false);
    navigate("/login");
  }, [setAuthenticated, navigate]);

  return <></>;
};

export default Logout;
