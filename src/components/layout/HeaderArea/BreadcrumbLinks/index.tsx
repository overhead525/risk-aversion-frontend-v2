import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  HeaderNavigation,
  HeaderMenuItem,
  BreadcrumbItem,
} from "carbon-components-react";
import { white } from "@carbon/colors";

import "./styles.scss";

import { urls } from "../../../../helpers/path";
import { removeHashtag } from "../../../../helpers/strings";

const customBreadcrumb = (text: string, href: string | null, key: number) => {
  return (
    <Link
      to={href ? href : "#"}
      style={{ textDecoration: "none" }}
      className="link-area"
    >
      <HeaderMenuItem>
        <BreadcrumbItem className="breadcrumb-item">
          <a style={{ color: white }}>{text}</a>
        </BreadcrumbItem>
      </HeaderMenuItem>
    </Link>
  );
};

const breadcrumbItems = [
  {
    hierachy: 0,
    urlMatch: urls.app,
    component: customBreadcrumb("Dashboard", urls.app, 0),
  },
  {
    hierachy: 1,
    urlMatch: null,
    component: customBreadcrumb("Simulation", null, 1),
  },
  {
    hierachy: 2,
    urlMatch: urls.setup,
    component: customBreadcrumb("Setup", urls.setup, 2),
  },
  {
    hierachy: 3,
    urlMatch: null,
    component: customBreadcrumb("Result", null, 3),
  },
];

export const BreadcrumbLinks: React.FC = () => {
  let history = useHistory();

  const rotateBreadcrumbs = (): JSX.Element[] => {
    const findPivot = (): number => {
      return breadcrumbItems.findIndex((item) => {
        return item.urlMatch === removeHashtag(history.location.pathname);
      });
    };

    const pivot = findPivot();

    return breadcrumbItems
      .slice(0, pivot + 1)
      .map(({ component, urlMatch }) => {
        const processedComponent =
          urlMatch! === removeHashtag(history.location.pathname) ? (
            <div className="component-wrapper last">{component}</div>
          ) : (
            <div className="component-wrapper">{component}</div>
          );
        return processedComponent;
      });
  };

  return (
    <HeaderNavigation aria-label="Risk Aversion">
      {rotateBreadcrumbs()}
    </HeaderNavigation>
  );
};
