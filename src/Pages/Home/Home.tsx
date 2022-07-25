import { useQuery } from "@tanstack/react-query";
import { Button, Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        {data?.data?.length > 0 ? (
          <div className="grid">
            {React.Children.toArray(
              data?.data?.map((bookmark: BookmarkType) => (
                <Bookmark bookmark={bookmark} />
              ))
            )}
          </div>
        ) : (
          <div className="flex center min-height-100 flex-column">
            <Typography.Title style={{ textAlign: "center" }}>
              You have not added any bookmarks yet.
            </Typography.Title>
            <Link to="/add-new-bookmark">
              <Button type="primary" shape="round">
                Add New Bookmark Now
              </Button>
            </Link>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default Home;
