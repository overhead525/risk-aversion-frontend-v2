import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  loginOnServer,
  logoutOnServer,
  selectAuthenticated,
} from "./authSlice";
import styles from "./auth.module.css";
import { parseClassName } from "../../helpers/strings";

interface AuthFormProps {
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ className }, props) => {
  const authenticatedStatus = useSelector(selectAuthenticated);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleUsernameChange = (e: any) => {
    e.preventDefault();
    setUser({
      ...user,
      username: e.target.value,
    });
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(loginOnServer(user.username, user.password));
  };

  const handleLogoutSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(logoutOnServer(""));
  };

  return (
    <div {...props} className={className ? parseClassName(className) : ""}>
      {authenticatedStatus === true ? (
        <div>
          <button onClick={handleLogoutSubmit}>Logout</button>
          <br />
        </div>
      ) : null}
      <input
        onChange={handleUsernameChange}
        type="text"
        name="username"
        id="username"
        placeholder="marcus"
      />
      <input
        onChange={handlePasswordChange}
        type="password"
        name="password"
        id="password"
        placeholder="••••••••••••••••"
      />
      <button onClick={handleLoginSubmit}>Login</button>
    </div>
  );
};
