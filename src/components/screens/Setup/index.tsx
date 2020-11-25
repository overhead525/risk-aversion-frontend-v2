import React, { useState } from "react";
import Naming from "./flows/naming";
import SetPrincipal from "./flows/setPrincipal";

enum flows {
  "NAMING",
  "SET_PRINCIPAL",
}

interface SetupProps {}

const Setup: React.FC<SetupProps> = () => {
  const [flowStep, setFlowStep] = useState(flows.NAMING);

  const renderFlowStep = () => {
    if (flowStep === flows.NAMING) return <Naming />;
    else if (flowStep === flows.SET_PRINCIPAL) return <SetPrincipal />;
  };

  return <div>{renderFlowStep()}</div>;
};

export default Setup;
