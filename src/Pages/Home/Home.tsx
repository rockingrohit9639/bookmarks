import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../axios/instance";
import Bookmark from "../../Components/Bookmark/Bookmark";
import { useAuthContext } from "../../hooks/useAuthentication";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Home: React.FC = () => {
  const { setAuthenticated, setUserContent } = useAuthContext();
  const navigate = useNavigate();
  const [token] = useLocalStorage("token", "");

  const getUserContent = useCallback(async () => {
    const res = await server.get("/users/profile");
    const userData = {
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
    };
    setUserContent(userData);
  }, [setUserContent]);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
      server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUserContent();
    } else {
      setAuthenticated(false);
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, token]);

  return (
    <div className="home container">
      <div className="grid">
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
      </div>
    </div>
  );
};

export default Home;
