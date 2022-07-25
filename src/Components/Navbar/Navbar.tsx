import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { useAuthContext } from "../../hooks/useAuthentication";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

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
