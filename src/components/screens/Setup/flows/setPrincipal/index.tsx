import React from "react";
import {
  Button,
  ButtonProps,
  NumberInput,
  NumberInputProps,
} from "carbon-components-react";
import { ArrowLeft32, CurrencyDollar32 } from "@carbon/icons-react";
import { flows } from "../..";

interface SetPrincipalProps {
  flowStepUpdateFn: React.Dispatch<any>;
  setupFormUpdateFn: (obj: { [key: string]: string | number }) => void;
}

const SetPrincipal: React.FC<SetPrincipalProps> = ({ flowStepUpdateFn }) => {
  const setPrincipalInputProps: NumberInputProps = {
    value: 1000,
    step: 1000,
    id: "simulation-principal",
  };

  const backButtonProps: ButtonProps = {
    onClick: (e) => {
      e.preventDefault();
      flowStepUpdateFn(flows.NAMING);
    },
  };

  return (
    <div className="flow-wrapper">
      <div className="content">
        <h1 className="leader">How much would you like to start with?</h1>
        <div className="input flex">
          <CurrencyDollar32 className="input__icon" />
          <NumberInput
            value={1000}
            id="simulation-principal"
            step={1000}
            helperText="Increments by $1000"
            min={1}
            invalidText="You need money to simulate"
            allowEmpty={false}
          />
        </div>
        <Button
          className="input next-button"
          {...backButtonProps}
          kind="tertiary"
          renderIcon={ArrowLeft32}
        >
          Back
        </Button>
        <div className="set-principal pictogram"></div>
      </div>
    </div>
  );
};

export default SetPrincipal;
