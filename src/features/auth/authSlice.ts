import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import { generateAuthServerInstance } from "../../api/";

interface AuthState {
    authenticated: boolean;
}

const initialState: AuthState = {
    authenticated: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.authenticated = true;
            console.log(state.authenticated);
            console.log("logged in");
        },
        logout: (state) => {
            state.authenticated = false;
            console.log(state.authenticated);
            console.log("logged out");
        }
    }
})

export const { login, logout } = authSlice.actions;

/**
 * Async Thunks
 */
export const loginOnServer = (
    username: string,
    password: string
): AppThunk => async (dispatch: Dispatch) => {
    const authServerInstance = generateAuthServerInstance({ headers: {} });
    
    try {
        const response = await authServerInstance.post("/login", {
            username,
            password
        });
        if (response.status === 200) {
            dispatch(login())
        } else {
            dispatch(logout());
        }
    } catch (err) {
        dispatch(logout());
    }
};

export const logoutOnServer = (
    refreshToken: string
): AppThunk => async (dispatch: Dispatch) => {
    const authServerInstance = generateAuthServerInstance({ headers: {} });

    try {
        await authServerInstance.post("/logout", {
            token: refreshToken,
        })
    } catch (error) {
        dispatch(logout());
    }

    dispatch(logout());
}

/**
 * Selectors
 */
export const selectAuthenticated = (state: RootState) => state.auth.authenticated;

export default authSlice.reducer;
