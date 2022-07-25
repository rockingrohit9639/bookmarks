import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBookmarks } from "../../axios/instance";
import Bookmark from "../../Components/Bookmark/Bookmark";
import { useAuthContext } from "../../hooks/useAuthentication";
import { BookmarkType } from "../../types/Bookmarks";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["bookmarks"], getBookmarks);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="home container">
      <Spin spinning={isLoading}>
        <div className="grid">
          {React.Children.toArray(
            data?.data?.map((bookmark: BookmarkType) => <Bookmark bookmark={bookmark} />)
          )}
        </div>
      </Spin>
    </div>
  );
};

export default Home;
