import React from "react";
import { SideNav, SideNavItems } from "carbon-components-react";

export const SideNavArea: React.FC = ({ children }) => {
  return (
    <SideNav>
      <SideNavItems>{children}</SideNavItems>
    </SideNav>
  );
};
