import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Naming from "./flows/naming";
import SetPrincipal from "./flows/setPrincipal";
import { ProgressIndicator, ProgressStep } from "carbon-components-react";
import {
  selectForm,
  updateSetupForm,
} from "../../../features/setupForm/setupFormSlice";

import "./setup.styles.scss";

export enum flows {
  "NAMING",
  "SET_PRINCIPAL",
}

interface SetupProps {}

const Setup: React.FC<SetupProps> = () => {
  const [flowStep, setFlowStep] = useState(flows.NAMING);

  const dispatch = useDispatch();

  const handleFormUpdate = (obj: { [key: string]: string | number }) => {
    dispatch(updateSetupForm(obj));
  };

  const correspondence: {
    [key: number]: {
      title: string;
      description: string;
      component: JSX.Element;
    };
  } = {
    0: {
      title: "Sim Name",
      description: "Name the simulation",
      component: (
        <Naming
          flowStepUpdateFn={setFlowStep}
          setupFormUpdateFn={handleFormUpdate}
        />
      ),
    },
    1: {
      title: "Initial Principal",
      description: "Set the initial principal",
      component: (
        <SetPrincipal
          flowStepUpdateFn={setFlowStep}
          setupFormUpdateFn={handleFormUpdate}
        />
      ),
    },
  };

  const renderProgressSteps = () => {
    return Object.entries(correspondence)
      .map((entry) => entry[1])
      .map(({ title, description }) => {
        return <ProgressStep label={title} description={description} />;
      });
  };

  const renderFlowStep = (targetFlowStep: number) => {
    return correspondence[targetFlowStep].component;
  };

  return (
    <div>
      <ProgressIndicator currentIndex={flowStep}>
        {renderProgressSteps()}
      </ProgressIndicator>
      <div>{renderFlowStep(flowStep)}</div>
    </div>
  );
};

export default Setup;
