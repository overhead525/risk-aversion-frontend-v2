import React from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonProps } from "carbon-components-react";
import { Add32, Home32 } from "@carbon/icons-react";
// import { NewSimulationButton } from "../../../../stories/ra_Button/Button.stories";

export const ExecutionButtons: React.FC = () => {
  const history = useHistory();
  const goHome = () => history.push("/");

  return (
    <div>
      <Button kind="primary" renderIcon={Add32}>
        New Simulation
      </Button>
      <Button kind="secondary" renderIcon={Home32} onClick={goHome}>
        Return to Home
      </Button>
    </div>
  );
};
