import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEntireProfile } from "../../../../features/profile/profileSlice";
import { convertRawProfile, composeRadarData, marketProfile } from "./helpers";
// @ts-ignore
import { RadarChart } from "@carbon/charts-react";

export const TradingProfileChart: React.FC = () => {
  const profile = useSelector(selectEntireProfile);

  console.log("Profile", profile);

  const data = [
    ...composeRadarData(convertRawProfile(profile.tradingHabits), "User"),
    ...composeRadarData(convertRawProfile(marketProfile), "Market"),
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
