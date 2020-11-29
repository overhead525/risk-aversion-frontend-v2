import React, { useState } from "react";
import {
  Button,
  ButtonProps,
  NumberInput,
  NumberInputProps,
} from "carbon-components-react";
import {
  ArrowLeft32,
  ArrowRight32,
  CurrencyDollar32,
} from "@carbon/icons-react";
import { flows } from "../..";

const DEFAULT_PRINCIPAL = 1000;

interface SetPrincipalProps {
  flowStepUpdateFn: React.Dispatch<any>;
  setupFormUpdateFn: (obj: { [key: string]: string | number }) => void;
}

const SetPrincipal: React.FC<SetPrincipalProps> = ({
  flowStepUpdateFn,
  setupFormUpdateFn,
}) => {
  const [principal, setPrincipal] = useState(DEFAULT_PRINCIPAL);

  const backButtonProps: ButtonProps = {
    onClick: (e) => {
      e.preventDefault();
      flowStepUpdateFn(flows.NAMING);
    },
  };

  const numberInputProps = {
    value: DEFAULT_PRINCIPAL,
    step: 0.01,
    id: "simulation-principal",
    helperText: "Incremements by $1000",
    min: 0,
    invalidText: "You need money to simulate",
    allowEmpty: false,
    onChange: (e: any) => {
      const numValue = parseFloat(e.imaginaryTarget.value);
      setPrincipal(numValue);
    },
  };

  const handleFormSubmit = () => {
    setupFormUpdateFn({ principal: principal });
  };

  return (
    <div className="flow-wrapper">
      <div className="content">
        <h1 className="leader">How much would you like to start with?</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (principal) handleFormSubmit();
          }}
        >
          <div className="input flex">
            <CurrencyDollar32 className="input__icon" />
            <NumberInput {...numberInputProps} />
          </div>
          <div className="button-group submit">
            <Button
              className="input next-button"
              {...backButtonProps}
              kind="tertiary"
              renderIcon={ArrowLeft32}
            >
              Back
            </Button>
            <Button
              className="input next-button"
              kind="secondary"
              type="submit"
              renderIcon={ArrowRight32}
            >
              Next
            </Button>
          </div>
        </form>
        <div className="set-principal pictogram"></div>
      </div>
    </div>
  );
};

export default SetPrincipal;
