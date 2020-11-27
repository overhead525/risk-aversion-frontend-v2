import React from "react";
import {
  TextInput,
  TextInputProps,
  Button,
  ButtonProps,
} from "carbon-components-react";
import { ArrowRight32 } from "@carbon/icons-react";

import { flows } from "../../index";

interface NamingProps {
  flowStepUpdateFn: React.Dispatch<any>;
}

const Naming: React.FC<NamingProps> = ({ flowStepUpdateFn }) => {
  const namingInputProps: TextInputProps = {
    placeholder: "Enter a name",
    labelText: "",
    id: "simulation-name",
    invalidText: "Please enter a name for the simulation",
    hideLabel: true,
  };

  const nextButtonProps: ButtonProps = {
    onClick: (e) => {
      e.preventDefault();
      flowStepUpdateFn(flows.SET_PRINCIPAL);
    },
  };

  return (
    <div className="flow-wrapper">
      <div className="content">
        <h1 className="leader">What should we call this simulation?</h1>
        <div className="input needs-width">
          <TextInput {...namingInputProps}></TextInput>
        </div>
        <Button
          className="input next-button"
          {...nextButtonProps}
          kind="secondary"
          renderIcon={ArrowRight32}
        >
          Next
        </Button>
        <div className="naming pictogram"> </div>
      </div>
    </div>
  );
};

export default Naming;
