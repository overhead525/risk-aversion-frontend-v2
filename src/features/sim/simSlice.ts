import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import { generateSimulationServerInstance } from "../../api";

export interface SimConfigObject {
  principal?: number;
  riskDecimal?: number;
  rewardDecimal?: number;
  winDecimal?: number;
  lossDecimal?: number;
  breakEvenDecimal?: number;
  numOfTrades?: number;
  numOfSimulations?: number;
}

export interface ExtendedSimConfigObject extends SimConfigObject {
  simName: string;
}

export interface SimResultObject {
  simName: string;
  simID: string;
  maxPortfolio: number;
  minPortfolio: number;
}

interface SimState {
  executed: boolean | null;
  simName: string | null;
  config: SimConfigObject | null;
  configurations: SimConfigObject[];
  simulations: SimResultObject[];
}

export const initialState: SimState = {
  executed: null,
  simName: null,
  config: null,
  configurations: [],
  simulations: [],
};

interface setSimulationActionPayload {
  executed?: boolean;
  simName?: string;
  config?: SimConfigObject;
  configurations?: SimConfigObject[];
  simulations?: SimResultObject[];
}

export const simSlice = createSlice({
  name: "sim",
  initialState,
  reducers: {
    setSimulation: (
      state,
      action: PayloadAction<setSimulationActionPayload>
    ) => {
      if (action.payload.executed) {
        // Update executed status
        state.executed = action.payload.executed;
      }
      if (action.payload.simName) {
        // Update simName
        state.simName = action.payload.simName;
      }
      if (action.payload.config) {
        // Update individual properties if you like
        state.config = {
          ...state.config,
          ...action.payload.config,
        };
      }
      if (action.payload.configurations) {
        // Update configurations array
        state.configurations = action.payload.configurations;
      }
      if (action.payload.simulations) {
        // Update simulations array
        state.simulations = action.payload.simulations;
      }
    },
  },
});

export const { setSimulation } = simSlice.actions;

/**
 * Async Thunks
 */
export const getMySimulations = (accessToken: string): AppThunk => async (
  dispatch: Dispatch
) => {
  const simServerInstance = generateSimulationServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await simServerInstance.get("/mySimulations/simulations");

    switch (response.status) {
      case 200:
        if (response.data) {
          const responseObject: {
            [simName: string]: {
              simID: string;
              maxPortfolio: number;
              minPortfolio: number;
            };
          } = response.data;

          const simResultArr = Object.keys(responseObject).map(
            (simName): SimResultObject => {
              return {
                simName,
                ...responseObject[simName],
              };
            }
          );

          dispatch(
            setSimulation({ executed: true, simulations: simResultArr })
          );
        }
        break;
      default:
        console.log("something went wrong with requst to get sims...");
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMyConfigurations = (accessToken: string): AppThunk => async (
  dispatch: Dispatch
) => {
  const simServerInstance = generateSimulationServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await simServerInstance.get(
      "/mySimulations/configurations"
    );

    switch (response.status) {
      case 200:
        if (response.data) {
          const responseObject: {
            [simName: string]: SimConfigObject;
          } = response.data;

          const simConfigObjectArr = Object.keys(responseObject).map(
            (simName): ExtendedSimConfigObject => {
              return {
                simName,
                ...responseObject[simName],
              };
            }
          );

          dispatch(
            setSimulation({
              executed: true,
              configurations: simConfigObjectArr,
            })
          );
        }
        break;
      default:
        console.log("something went wrong with requst to get sims...");
        break;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Selectors
 */
export const selectExecuted = (state: RootState) => state.sim.executed;

export default simSlice.reducer;
