import React, { useState } from "react";
import Naming from "./flows/naming";
import SetPrincipal from "./flows/setPrincipal";

import "./setup.styles.scss";

enum flows {
  "NAMING",
  "SET_PRINCIPAL",
}

const correspondence: {
  [key: number]: { title: string; component: JSX.Element };
} = {
  0: {
    title: "Name the simulation",
    component: <Naming />,
  },
  1: {
    title: "Set initial principal",
    component: <SetPrincipal />,
  },
};

interface SetupProps {}

const Setup: React.FC<SetupProps> = () => {
  const [flowStep, setFlowStep] = useState(flows.NAMING);

  const renderFlowStep = (targetFlowStep: number) => {
    return correspondence[targetFlowStep].component;
  };

  return (
    <div>
      <div>{renderFlowStep(flowStep)}</div>
    </div>
  );
};

export default Setup;
