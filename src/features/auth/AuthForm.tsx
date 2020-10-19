import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loginOnServer,
  logoutOnServer,
  selectAuthenticated,
} from "./authSlice";
import styles from "./auth.module.css";
import { parseClassName } from "../../helpers/strings";
import * as lockr from "lockr";

interface AuthFormProps {
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ className }, props) => {
  const authenticatedStatus = useSelector(selectAuthenticated);
  const { accessToken, refreshToken } = JSON.parse(
    localStorage.getItem("persist:localRoot")!
  );
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
      <div>
        Authenticated:{" "}
        <span
          style={{ color: `${authenticatedStatus === false ? "red" : "blue"}` }}
        >
          {`${authenticatedStatus}`}
        </span>
      </div>
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
