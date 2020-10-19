import { configureStore, ThunkAction, Action, combineReducers, applyMiddleware, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";

const authPersistConfig = {
    key: 'localRoot',
    storage: localStorage,
    whitelist: ["accessToken", "refreshToken"],
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer)
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
