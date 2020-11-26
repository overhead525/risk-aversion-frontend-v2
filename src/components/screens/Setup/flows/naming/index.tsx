import React from "react";
import { TextInput, TextInputProps } from "carbon-components-react";

interface NamingProps {}

const Naming: React.FC<NamingProps> = () => {
  const namingInputProps: TextInputProps = {
    placeholder: "Enter a name",
    labelText: "",
    id: "simulation-name",
    hideLabel: true,
  };

  return (
    <div className="flow-wrapper">
      <div className="content">
        <h1 className="leader">What should we call this simulation?</h1>
        <div className="input needs-width">
          <TextInput {...namingInputProps}></TextInput>
        </div>
        <div className="naming pictogram"> </div>
      </div>
    </div>
  );
};

export default Naming;
