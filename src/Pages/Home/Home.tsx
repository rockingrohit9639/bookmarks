import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bookmark from "../../Components/Bookmark/Bookmark";
import { useAuthContext } from "../../hooks/useAuthentication";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

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
