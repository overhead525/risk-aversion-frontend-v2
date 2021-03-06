import React, { createRef, RefObject, useEffect, useState } from "react";
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
  setupFormUpdateFn: (obj: { [key: string]: string | number }) => void;
}

const Naming: React.FC<NamingProps> = ({
  flowStepUpdateFn,
  setupFormUpdateFn,
}) => {
  const [simName, setSimName] = useState("");
  const [validStatus, setValidStatus] = useState(true);

  const checkSimName = (str: string) => {
    if (str.length === 0) setValidStatus(false);
    else setValidStatus(true);
  };

  const namingInputProps: TextInputProps = {
    placeholder: "Enter a name",
    labelText: "",
    id: "simulation-name",
    invalidText: "Please enter a name for the simulation",
    hideLabel: true,
    onChange: (e) => {
      e.preventDefault();
      checkSimName(e.currentTarget.value);
      setSimName(e.currentTarget.value);
    },
  };

  const invalidNamingInputProps: TextInputProps = {
    ...namingInputProps,
    invalid: true,
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setupFormUpdateFn({ simName: simName });
    if (!(simName.length > 0)) return setValidStatus(false);
    flowStepUpdateFn(flows.SET_PRINCIPAL);
  };

  const handleValidationAssignment = () => {
    return validStatus ? namingInputProps : invalidNamingInputProps;
  };

  return (
    <div className="flow-wrapper">
      <div className="content">
        <h1 className="leader">What should we call this simulation?</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="input needs-width">
            <TextInput {...handleValidationAssignment()}></TextInput>
          </div>
          <div className="submit">
            <Button
              id="next-button"
              className="input next-button"
              type="submit"
              kind="secondary"
              renderIcon={ArrowRight32}
            >
              Next
            </Button>
          </div>
        </form>
        <div className="naming pictogram"> </div>
      </div>
    </div>
  );
};

export default Naming;
