import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../axios/instance";
import Bookmark from "../../Components/Bookmark/Bookmark";
import { useAuthContext } from "../../hooks/useAuthentication";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Home: React.FC = () => {
  

  

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
