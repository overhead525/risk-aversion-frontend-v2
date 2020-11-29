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

export interface SetFormActionPayload extends Object {
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
    updateSetupForm: (state, action: PayloadAction<SetFormActionPayload>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateSetupForm } = setupFormSlice.actions;

export const selectForm = (state: RootState) => state.setupForm;

export default setupFormSlice.reducer;
