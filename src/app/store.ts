import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import localForage from "localforage";
import authReducer from "../features/auth/authSlice";
import simReducer from "../features/sim/simSlice";
import profileReducer from "../features/profile/profileSlice";
import setupFormReducer from "../features/setupForm/setupFormSlice";

const authPersistConfig = {
  key: "authRoot",
  storage: localStorage,
  whitelist: ["authenticated", "username", "accessToken", "refreshToken"],
};

const simPersistConfig = {
  key: "simRoot",
  storage: sessionStorage,
  whitelist: [
    "simName",
    "config",
    "simResult",
    "configurations",
    "simulations",
  ],
};

const profilePersistConfig = {
  key: "profileRoot",
  storage: localForage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  sim: persistReducer(simPersistConfig, simReducer),
  profile: persistReducer(profilePersistConfig, profileReducer),
  setupForm: setupFormReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
