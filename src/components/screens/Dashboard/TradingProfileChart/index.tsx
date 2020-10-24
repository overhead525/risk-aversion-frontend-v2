import React from "react";
// @ts-ignore
import { RadarChart } from "@carbon/charts-react";

export const TradingProfileChart: React.FC = () => {
  const data = [
    {
      trader: "User",
      attribute: "Risk",
      score: 25,
    },
    {
      trader: "User",
      attribute: "Reward",
      score: 46,
    },
    {
      trader: "User",
      attribute: "Win Percentage",
      score: 55,
    },
    {
      trader: "User",
      attribute: "Loss Percentage",
      score: 27,
    },
    {
      trader: "Market",
      attribute: "Risk",
      score: 12,
    },
    {
      trader: "Market",
      attribute: "Reward",
      score: 38,
    },
    {
      trader: "Market",
      attribute: "Win Percentage",
      score: 76,
    },
    {
      trader: "Market",
      attribute: "Loss Percentage",
      score: 24,
    },
  ];

  const options = {
    title: "Trading Profile",
    radar: {
      axes: {
        angle: "attribute",
        value: "score",
      },
    },
    data: {
      groupMapsTo: "trader",
    },
    height: "100%",
  };

  return <RadarChart data={data} options={options}></RadarChart>;
};
