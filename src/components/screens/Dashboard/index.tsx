import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../../../features/profile/profileSlice";
import { getMyConfigurations } from "../../../features/sim/simSlice";
import { TradingProfileChart } from "./TradingProfileChart";
import { ExecutionButtons } from "./ExecutionButtons";
import "./styles.scss";
import { SimulationsTable } from "./SimulationsTable";
import * as secrets from "../../../secrets.js";

interface DashboardProps {}

const initialUser = {
  name: "Malcolm Gladwell",
};

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(initialUser);

  const getUserProfileWrapper = async () => {
    const accessToken = secrets.PERMANENT_ACCESS_TOKEN;
    const username = "LmalcolmR";
    await dispatch(getUserProfile(accessToken, username));
  };

  const getUserConfigurationsWrapper = async () => {
    const accessToken = secrets.PERMANENT_ACCESS_TOKEN;
    await dispatch(getMyConfigurations(accessToken));
  };

  useEffect(() => {
    getUserProfileWrapper();
    getUserConfigurationsWrapper();
  });

  return (
    <div className="bx--grid">
      <div className="bx--row mb__standard">
        <div className="bx--col-md-5" id="data">
          <p>Dashboard</p>
          <h1 className="username-hero">{user.name}</h1>
          <ExecutionButtons />
        </div>
        <div className="bx--col-md-3" id="simulations-table">
          <div className="chart-wrapper">
            <TradingProfileChart />
          </div>
        </div>
      </div>
      <div className="bx--row">
        <div className="bx--col">
          <SimulationsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
