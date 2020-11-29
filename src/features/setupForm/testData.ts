import {
  SetFormActionPayload,
  SetupFormState,
  initialState,
} from "./setupFormSlice";

export const partialSF: {
  payload: SetFormActionPayload;
  stateResult: SetupFormState;
} = {
  payload: {
    simName: "Making this Work",
    numOfSimulations: 2700,
  },
  stateResult: {
    ...initialState,
    simName: "Making this Work",
    numOfSimulations: 2700,
  },
};
