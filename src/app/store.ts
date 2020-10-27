import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import * as localForage from "localforage";
import localStorage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "../features/auth/authSlice";
import simReducer from "../features/sim/simSlice";
import resourceReducer from "../features/resource/resourceSlice";

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

const resourcePersistConfig = {
  key: "resourceForage",
  storage: localForage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  sim: persistReducer(simPersistConfig, simReducer),
  resource: persistReducer(resourcePersistConfig, resourceReducer),
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
