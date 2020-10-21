import * as _ from "lodash";
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

export interface SimState {
  executed: boolean | null;
  simName: string | null;
  config: SimConfigObject | null;
  simResult: SimResultObject | null;
  configurations: SimConfigObject[];
  simulations: SimResultObject[];
}

export const initialState: SimState = {
  executed: null,
  simName: null,
  config: null,
  simResult: null,
  configurations: [],
  simulations: [],
};

interface setSimulationActionPayload {
  executed?: boolean;
  simName?: string;
  config?: SimConfigObject;
  simResult?: SimResultObject;
  configurations?: SimConfigObject[];
  simulations?: SimResultObject[];
}

interface resetStatePropActionPayload {
  executed: boolean;
  simName: boolean;
  config: boolean;
  simResult: boolean;
  configurations: boolean;
  simulations: boolean;
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
      if (action.payload.simResult) {
        // Update individual properties if you like
        state.simResult = {
          ...state.simResult,
          ...action.payload.simResult,
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
    resetStateProp: (
      state,
      action: PayloadAction<resetStatePropActionPayload>
    ) => {
      if (action.payload.executed === true) state.executed = null;
      if (action.payload.simName === true) state.simName = null;
      if (action.payload.config === true) state.config = null;
      if (action.payload.simResult === true) state.config = null;
      if (action.payload.configurations === true) state.configurations = [];
      if (action.payload.simulations === true) state.simulations = [];
    },
  },
});

export const { setSimulation, resetStateProp } = simSlice.actions;

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
        dispatch(setSimulation({ executed: false }));
        break;
    }
  } catch (error) {
    dispatch(setSimulation({ executed: false }));
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

export const initiateSimulation = (
  accessToken: string,
  simName: string,
  params: SimConfigObject
): AppThunk => async (dispatch: Dispatch) => {
  const simServerInstance = generateSimulationServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const parsedSimName = _.camelCase(simName);

  try {
    const response = await simServerInstance.post("/init", {
      simName: parsedSimName,
      params,
    });

    switch (response.status) {
      case 200:
        const result: {
          simID: string;
          maxPortfolio: number;
          minPortfolio: number;
        } = response.data.simulate.result;
        console.log(result);
        const resultToBeStored: SimResultObject = {
          simName: parsedSimName,
          simID: result.simID,
          maxPortfolio: result.maxPortfolio,
          minPortfolio: result.minPortfolio,
        };
        dispatch(
          setSimulation({
            simName: parsedSimName,
            config: params,
            simResult: resultToBeStored,
          })
        );
        break;
    }
  } catch (error) {
    return;
  }
};

/**
 * Selectors
 */
export const selectExecuted = (state: RootState) => state.sim.executed;

export default simSlice.reducer;
