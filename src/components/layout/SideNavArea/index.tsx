import React from "react";
import { SideNav, SideNavItems } from "carbon-components-react";
import { StockTable } from "./SideNavHeaderItems/StockTable";
import { GoalGaugeChart } from "./SideNavHeaderItems/GoalGaugeChart";

import "./styles.scss";

export const SideNavArea: React.FC = () => {
  return (
    <SideNav className="sideNav">
      <SideNavItems>
        <div className="bx--grid">
          <div className="bx--row ra_mb_medium">
            <div>
              <div className="ra_mb_small">Snapshot of Holdings</div>
              <StockTable />
            </div>
          </div>
          <div className="bx--row ra_mb_small">
            <div>
              <p className="current-portfolio__label">Current Portfolio</p>
              <h4 className="current-portfolio__value">$12,756.34</h4>
            </div>
          </div>
          <div className="bx--row ra_mb_medium">
            <div>
              <h5 className="goal-portfolio__label">Goal Portfolio</h5>
              <h3 className="goal-portfolio__value">$31,000.00</h3>
            </div>
          </div>
          <div className="bx--row">
            <div className="graph-box">
              <p>Progress Towards Goal</p>
              <GoalGaugeChart />
            </div>
          </div>
        </div>
      </SideNavItems>
    </SideNav>
  );
};
