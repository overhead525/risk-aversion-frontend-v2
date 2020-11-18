import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  selectEntireProfile,
} from "../../../../features/profile/profileSlice";
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
      score: 30,
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
