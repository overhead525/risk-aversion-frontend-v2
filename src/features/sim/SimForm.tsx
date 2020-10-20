import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyConfigurations,
  getMySimulations,
  selectExecuted,
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

  return (
    <div>
      <br />
      <h2>SimForm</h2>
      {executed === true ? (
        <p>Executed request, check console</p>
      ) : (
        <div>
          <button onClick={handleGetMySimulations}>Get My Simulations</button>
          <button onClick={handleGetMyConfigurations}>
            Get My Configurations
          </button>
        </div>
      )}
    </div>
  );
};

export default SimForm;
