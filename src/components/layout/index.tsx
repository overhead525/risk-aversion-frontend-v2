import React, { useEffect } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthenticationStatus,
  selectAuthenticated,
  selectUsername,
} from "../../features/auth/authSlice";

/**
 * Component Imports
 */
import Header from "../header";
import Dashboard from "../screens/Dashboard";
import Sidebar from "../sidebar";

/**
 * Area Imports
 */
import HeaderArea from "./HeaderArea";
import ScreenArea from "./ScreenArea";
import SidebarArea from "./SidebarArea";
import SimForm from "../../features/sim/SimForm";
import ResourceForm from "../../features/resource/ResourceForm";

export interface LayoutProps extends RouteComponentProps {}

const Layout: React.FC<LayoutProps> = () => {
  const authenticatedStatus = useSelector(selectAuthenticated);
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();

  useEffect((): void => {
    const { accessToken, refreshToken } = JSON.parse(
      localStorage.getItem("persist:authRoot")!
    );
    if (accessToken && refreshToken) {
      dispatch(
        checkAuthenticationStatus(
          accessToken.replaceAll('"', ""),
          refreshToken.replaceAll('"', "")
        )
      );
    }
  });

  return authenticatedStatus === true ? (
    <div>
      <p>
        Logged in as <span style={{ color: "blue" }}>{`${username}`}</span>
      </p>
      <HeaderArea>
        <Header />
      </HeaderArea>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ScreenArea>
        <SimForm />
        <ResourceForm />
      </ScreenArea>
    </div>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Layout;
