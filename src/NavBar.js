import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/maps">Maps</Link>
        </li>
        <li>
          <Link to="/articles-list">Articles</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <LoginButton />
          </li>
        )}
        {isAuthenticated && (
          <>
            <li>welcome {user.name}</li>

            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavBar;
