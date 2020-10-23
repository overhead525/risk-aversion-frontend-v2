import React from "react";
import { Content } from "carbon-components-react";
import Dashboard from "../../screens/Dashboard";

import "./styles.scss";

interface ScreenAreaProps {
  useResponsiveOffset: boolean;
}

export const ScreenArea: React.FC<ScreenAreaProps> = ({
  useResponsiveOffset = true,
}) => {
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="main-offset bx--col-lg-9">
          <Dashboard />
        </div>
      </div>
    </div>
  );
  return <Content id="main-content">{content}</Content>;
};
