import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App.js";
const Header = () => {
  const { state } = useContext(userContext);
  const NavigationCondition = () => {
    if (state) {
      return [
        <li>
          <Link to="/addpost">Create Post</Link>
        </li>,
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={state ? "/" : "/login"} className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down margin">
            {NavigationCondition()}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Header;
