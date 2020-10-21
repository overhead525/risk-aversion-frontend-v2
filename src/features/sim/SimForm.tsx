import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyConfigurations,
  getMySimulations,
  initiateSimulation,
  selectExecuted,
  SimConfigObject,
} from "../sim/simSlice";

interface SimFormProps {}

const SimForm: React.FC<SimFormProps> = () => {
  const dispatch = useDispatch();
  const executed = useSelector(selectExecuted);

  const handleGetMySimulations = async () => {
    const { accessToken } = JSON.parse(
      localStorage.getItem("persist:authRoot")!
    );
    await dispatch(getMySimulations(accessToken.replaceAll('"', "")));
  };

  const handleGetMyConfigurations = async () => {
    const { accessToken } = JSON.parse(
      localStorage.getItem("persist:authRoot")!
    );
    await dispatch(getMyConfigurations(accessToken.replaceAll('"', "")));
  };

  const handleInitSimulation = async () => {
    const { accessToken } = JSON.parse(
      localStorage.getItem("persist:authRoot")!
    );
    const simName = "Working Name";
    const params: SimConfigObject = {
      principal: 100000,
      riskDecimal: 0.05,
      rewardDecimal: 0.15,
      winDecimal: 0.6,
      lossDecimal: 0.4,
      breakEvenDecimal: 0.37,
      numOfTrades: 78,
      numOfSimulations: 100000,
    };
    await dispatch(
      initiateSimulation(accessToken.replaceAll('"', ""), simName, params)
    );
    await handleGetMySimulations();
    await handleGetMyConfigurations();
  };

  return (
    <div>
      <br />
      <h2>SimForm</h2>
      {executed === true ? (
        <p>Executed request, check storage</p>
      ) : (
        <div>
          <button onClick={handleGetMySimulations}>Get My Simulations</button>
          <button onClick={handleGetMyConfigurations}>
            Get My Configurations
          </button>
          <button onClick={handleInitSimulation}>Initialize Simulation</button>
        </div>
      )}
    </div>
  );
};

export default SimForm;
