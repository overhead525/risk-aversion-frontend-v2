import React from "react";
// @ts-ignore
import { GaugeChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

export const GoalGaugeChart: React.FC = () => {
  const data = [
    {
      group: "value",
      value: 42,
    },
    {
      group: "delta",
      value: -13.37,
    },
  ];
  const options = {
    resizable: true,
    width: "100%",
    gauge: {
      type: "semi",
      status: "danger",
    },
  };

  return <GaugeChart data={data} options={options} />;
};
