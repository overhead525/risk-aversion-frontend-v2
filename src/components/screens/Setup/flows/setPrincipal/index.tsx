import React from "react";
import { NumberInput, NumberInputProps } from "carbon-components-react";
import { CurrencyDollar32 } from "@carbon/icons-react";

interface SetPrincipalProps {}

const SetPrincipal: React.FC<SetPrincipalProps> = () => {
  const setPrincipalInputProps: NumberInputProps = {
    value: 1000,
    step: 1000,
    id: "simulation-principal",
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
        <div className="set-principal pictogram"></div>
      </div>
    </div>
  );
};

export default SetPrincipal;
