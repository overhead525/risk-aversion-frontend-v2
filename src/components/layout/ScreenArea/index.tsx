import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Content } from "carbon-components-react";
import Dashboard from "../../screens/Dashboard";
import Setup from "../../screens/Setup";
import { WhichScreen } from "../index";

import "./styles.scss";

interface ScreenAreaProps {
  useResponsiveOffset: boolean;
  is: WhichScreen;
}

export const ScreenArea: React.FC<ScreenAreaProps> = ({
  useResponsiveOffset = true,
  is = WhichScreen.DASHBOARD,
}) => {
  const content = (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="main-offset bx--col-lg-10">
          {(() => {
            if (is === WhichScreen.DASHBOARD) {
              return <Dashboard />;
            } else if (is === WhichScreen.SETUP) {
              return <Setup />;
            }
          })()}
        </div>
      </div>
    </div>
  );
  return <Content id="main-content">{content}</Content>;
};
