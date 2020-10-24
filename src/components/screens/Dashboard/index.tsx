import React, { useState } from "react";
import { TradingProfileChart } from "./TradingProfileChart";
import { ExecutionButtons } from "./ExecutionButtons";
import "./styles.scss";
import { SimulationsTable } from "./SimulationsTable";

interface DashboardProps {}

const initialUser = {
  name: "Malcolm Gladwell",
};

const Dashboard: React.FC<DashboardProps> = () => {
  const [user, setUser] = useState(initialUser);
  return (
    <div className="bx--grid">
      <div className="bx--row mb__standard">
        <div className="bx--col-md-5 scaffold" id="data">
          <p>Dashboard</p>
          <h1 className="username-hero">{user.name}</h1>
          <ExecutionButtons />
        </div>
        <div className="bx--col-md-3 scaffold" id="simulations-table">
          <div className="chart-wrapper">
            <TradingProfileChart />
          </div>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col scaffold">
          <SimulationsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
