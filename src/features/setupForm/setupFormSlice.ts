import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

export interface SetupFormState extends Object {
  simName: string | null;
  principal: number | null;
  riskDecimal: number | null;
  rewardDecimal: number | null;
  winDecimal: number | null;
  lossDecimal: number | null;
  breakEvenDecimal: number | null;
  numOfTrades: number | null;
  numOfSimulations: number | null;
}

export const initialState: SetupFormState = {
  simName: null,
  principal: null,
  riskDecimal: null,
  rewardDecimal: null,
  winDecimal: null,
  lossDecimal: null,
  breakEvenDecimal: null,
  numOfTrades: null,
  numOfSimulations: null,
};

export interface SetFormAction {
  simName?: string;
  principal?: number;
  riskDecimal?: number;
  rewardDecimal?: number;
  winDecimal?: number;
  lossDecimal?: number;
  breakEvenDecimal?: number;
  numOfTrades?: number;
  numOfSimulations?: number;
}

export const setupFormSlice = createSlice({
  name: "setupForm",
  initialState,
  reducers: {
    updateSetupForm: (state, action: PayloadAction<SetFormAction>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateSetupForm } = setupFormSlice.actions;

export const getFormProperty = (state: RootState, formProp: string) => {
  const propArray = Object.entries(state.setupForm).filter((pair) => {
    return pair[0] === formProp ? pair[1] : null;
  });
  const onEmpty = (arr: any[]) => {
    if (arr.length > 0) {
      throw new Error(
        `There seems to be more than one property with the name ${formProp}. This should be taken care of immediately`
      );
    } else if (arr.length === 0) {
      console.error(`The state object had no property with name ${formProp}`);
    }
    return null;
  };
  return propArray.length === 1 ? propArray[0] : onEmpty(propArray);
};

export default setupFormSlice.reducer;
