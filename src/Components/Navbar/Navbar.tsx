import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { useAuthContext } from "../../hooks/useAuthentication";

const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <div className="navbar">
      <div className="container flex align-items-center justify-content-between">
        <div className="navbar__left">
          <Link to="/">
            <Typography.Title className="bold">Bookmarks</Typography.Title>
          </Link>
        </div>
        <div className="navbar__right flex align-items-center">
          {isAuthenticated ? (
            <>
              <div>
                <Typography.Text>Welcome</Typography.Text>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  {user?.firstName ?? "Guest123"}
                </Typography.Title>
              </div>

              <Link to={"/logout"}>Logout</Link>
              <Link to={"/add-new-bookmark"}>
                <Button type="primary" shape="round">
                  Add Bookmark
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>
                <Button type="primary" shape="round">
                  SignUp
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
