import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonProps } from "carbon-components-react";
import { Add32, Home32 } from "@carbon/icons-react";
// import { NewSimulationButton } from "../../../../stories/ra_Button/Button.stories";

export const ExecutionButtons: React.FC = () => (
  <div>
    <Link to="/app/sim-setup" style={{ textDecoration: "none" }}>
      <Button kind="primary" renderIcon={Add32}>
        New Simulation
      </Button>
    </Link>
    <Link to="/" style={{ textDecoration: "none" }}>
      <Button kind="secondary" renderIcon={Home32}>
        Return to Home
      </Button>
    </Link>
  </div>
);
