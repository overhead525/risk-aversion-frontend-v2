import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { generateProfileServerInstance } from "../../api";

export interface ProfileState {
  firstName: string | null;
  lastName: string | null;
  tradingHabits: {
    risk: number | null;
    reward: number | null;
    lossPercentage: number | null;
    winPercentage: number | null;
  };
  goalPortfolio: number | null;
}

export const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  tradingHabits: {
    risk: null,
    reward: null,
    lossPercentage: null,
    winPercentage: null,
  },
  goalPortfolio: null,
};

export interface SetProfileActionPayload {
  firstName?: string;
  lastName?: string;
  tradingHabits?: {
    risk?: number;
    reward?: number;
    lossPercentage?: number;
    winPercentage?: number;
  };
  goalPortfolio?: number;
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<SetProfileActionPayload>) => {
      if (action.payload.firstName) state.firstName = action.payload.firstName;
      if (action.payload.lastName) state.lastName = action.payload.lastName;
      if (action.payload.tradingHabits) {
        if (action.payload.tradingHabits.risk)
          state.tradingHabits.risk = action.payload.tradingHabits.risk;
        if (action.payload.tradingHabits.reward)
          state.tradingHabits.reward = action.payload.tradingHabits.reward;
        if (action.payload.tradingHabits.lossPercentage)
          state.tradingHabits.lossPercentage =
            action.payload.tradingHabits.lossPercentage;
        if (action.payload.tradingHabits.winPercentage)
          state.tradingHabits.winPercentage =
            action.payload.tradingHabits.winPercentage;
      }
      if (action.payload.goalPortfolio)
        state.goalPortfolio = action.payload.goalPortfolio;
    },
  },
});

export const { setProfile } = profileSlice.actions;

/**
 * Async Thunks
 */
export const getUserProfile = (
  accessToken: string,
  username: string
): AppThunk => async (dispatch: Dispatch) => {
  const profileServerInstance = generateProfileServerInstance({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  try {
    const response = await profileServerInstance.get(`/${username}`);

    switch (response.status) {
      case 200:
        if (response.data) {
          const responseObject: {
            firstName?: string;
            lastName?: string;
            tradingHabits?: {
              risk?: number;
              reward?: number;
              lossPercentage?: number;
              winPercentage?: number;
            };
            goalPortfolio?: number;
          } = response.data;

          dispatch(setProfile(responseObject));
        }
        break;
      default:
        console.error("Could not retrieve trading profile for some reason...");
        break;
    }
  } catch (error) {
    console.error("Error", error);
  }
};

export const postUserProfile = (accessToken: string, username: string) => {};

/**
 * Selectors
 */
export const selectEntireProfile = (state: RootState) => state.profile;
export const selectProfileProperty = (
  state: RootState,
  propertiesArr: string[]
) => {
  const currentState = Object.create(state.profile);
  const profileProperties = Object.create(null);
  propertiesArr.forEach((property) => {
    profileProperties[property] = currentState[property];
  });
  return profileProperties;
};

export default profileSlice.reducer;
