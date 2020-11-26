import React, { useState } from "react";
import Naming from "./flows/naming";
import SetPrincipal from "./flows/setPrincipal";

import "./setup.styles.scss";

enum flows {
  "NAMING",
  "SET_PRINCIPAL",
}

const correspondence: { [key: number]: JSX.Element } = {
  0: <Naming />,
  1: <SetPrincipal />,
};

interface SetupProps {}

const Setup: React.FC<SetupProps> = () => {
  const [flowStep, setFlowStep] = useState(flows.NAMING);

  const renderFlowStep = (targetFlowStep: number) => {
    return correspondence[targetFlowStep];
  };

  return <div>{renderFlowStep(flowStep)}</div>;
};

export default Setup;
