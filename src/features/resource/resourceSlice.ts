import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import { generateResourceServerInstance } from "../../api";

export interface ResourceState {}

export const initialState: ResourceState = {};

export const resourceSlice = createSlice({
  name: "resource",
  initialState,
  reducers: {},
});

export const retrieveSimulationImage = (
  accessToken: string,
  simID: string
): AppThunk => async (dispatch: Dispatch) => {
  const resourceServerInstance = generateResourceServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await resourceServerInstance.get(`/image/${simID}`);
    console.log(response);
  } catch (error) {
    console.error("Could not request the image");
  }
};
