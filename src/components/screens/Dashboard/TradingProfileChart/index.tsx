import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  selectEntireProfile,
} from "../../../../features/profile/profileSlice";
import { convertRawProfile, composeRadarData, marketProfile } from "./helpers";
// @ts-ignore
import { RadarChart } from "@carbon/charts-react";

export const TradingProfileChart: React.FC = () => {
  const dispatch = useDispatch();

  const profile = useSelector(selectEntireProfile);
  console.log("Profile", profile);

  const getUserProfileWrapper = async () => {
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTG1hbGNvbG1SIiwiaWF0IjoxNjAzNjk2NzI1fQ.h5nXMrUYJyWaEP0wkVoxzx3HfM9deYcZHuAgTEL1AkQ";
    const username = "LmalcolmR";
    await dispatch(getUserProfile(accessToken, username));
  };

  useEffect(() => {
    getUserProfileWrapper();
  }, []);

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
