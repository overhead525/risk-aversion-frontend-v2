import React from "react";
import {
  HeaderNavigation,
  HeaderMenuItem,
  BreadcrumbItem,
} from "carbon-components-react";

export const BreadcrumbLinks: React.FC = () => {
  return (
    <HeaderNavigation aria-label="Risk Aversion">
      <HeaderMenuItem href="#">
        <BreadcrumbItem>
          <a>Dashboard</a>
        </BreadcrumbItem>
      </HeaderMenuItem>
      <HeaderMenuItem href="#">
        <BreadcrumbItem>
          <a>Simulation</a>
        </BreadcrumbItem>
      </HeaderMenuItem>
      <HeaderMenuItem href="#">
        <BreadcrumbItem>
          <a>Setup</a>
        </BreadcrumbItem>
      </HeaderMenuItem>
      <HeaderMenuItem href="#">
        <BreadcrumbItem>
          <a>Result</a>
        </BreadcrumbItem>
      </HeaderMenuItem>
    </HeaderNavigation>
  );
};
