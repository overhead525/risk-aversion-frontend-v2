import React, { useState } from "react";

import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownProps,
  Slider,
  SliderProps,
} from "carbon-components-react";
import { ArrowLeft32 } from "@carbon/icons-react";

import { flows } from "../../index";
import { riskDropdownItems } from "./data";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface RiskRewardProps {
  flowStepUpdateFn: React.Dispatch<any>;
  setupFormUpdateFn: (obj: { [key: string]: string | number }) => void;
}

const RiskReward: React.FC<RiskRewardProps> = ({ flowStepUpdateFn }) => {
  const [page, setPage] = useState(0);

  const flowBackButtonProps: ButtonProps = {
    onClick: (e) => {
      e.preventDefault();
      flowStepUpdateFn(flows.SET_PRINCIPAL);
    },
  };

  const riskDropdownProps: DropdownProps = {
    id: "risk-dropdown",
    label: "Amount to Risk",
    items: riskDropdownItems.map((el) => el.text),
    titleText: false,
    ariaLabel: "risk-dropdown",
  };

  const pages = [
    <div className="content">
      <h1 className="leader">
        Do you know your <strong>risk</strong> to <strong>reward</strong> ratio?
      </h1>
      <div className="choice-cards">
        <Card className="c-mui-root" id="Yes">
          <CardActionArea className="action-area-balancer">
            <div className="justice-balance pictogram"></div>
            <CardContent>
              <p style={{ textAlign: "center" }}>Yes I know it</p>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="c-mui-root" id="No">
          <CardActionArea className="action-area-balancer">
            <div className="trust pictogram"></div>
            <CardContent>
              <p style={{ textAlign: "center" }}>I need help deciding</p>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <Button
        className="input next-button"
        {...flowBackButtonProps}
        kind="tertiary"
        renderIcon={ArrowLeft32}
      >
        Back
      </Button>
    </div>,
    <div className="content">
      <div className="constructed-sentence">
        <h3>I'll risk &ensp;</h3>
        <Dropdown {...riskDropdownProps} />
        <h3>&ensp; to gain</h3>
      </div>
    </div>,
    <div className="content"></div>,
  ];

  const renderPage = () => pages[page];

  return <div className="flow-wrapper">{renderPage()}</div>;
};

export default RiskReward;
