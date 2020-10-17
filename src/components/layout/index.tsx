import React from "react";
import { RouteComponentProps } from "react-router-dom";

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

export interface LayoutProps extends RouteComponentProps {
  isAuthed: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAuthed }) => {
  // Eventually, we're gonna pass state to all of these components,
  // using the Layout as the "GRAND central station" for state
  // actions and what not

  // I'll also control styling of the layout, more or less, from
  // this layout component
  return (
    <div>
      <HeaderArea>
        <Header />
      </HeaderArea>
      <SidebarArea>
        <Sidebar />
      </SidebarArea>
      <ScreenArea>
        <Dashboard />
      </ScreenArea>
    </div>
  );
};

export default Layout;
