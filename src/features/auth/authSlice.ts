import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

import { generateAuthServerInstance } from "../../api/";

interface AuthState {
    authenticated: boolean;
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    authenticated: false,
    username: null,
    accessToken: null,
    refreshToken: null
}

interface loginPayloadAction {
    username?: string;
    accessToken?: string;
    refreshToken?: string;
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<loginPayloadAction>) => {
            state.authenticated = true;
            if (action.payload.username) {
                state.username = action.payload.username;
            }
            if (action.payload.accessToken && action.payload.refreshToken) {
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            }
        },
        logout: (state) => {
            state.authenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
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
            if (
                (response.data && response.data.accessToken) &&
                (response.data && response.data.refreshToken)
            ) {
                dispatch(login({
                    username,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }))
            } else {
                dispatch(login({}));
            }
        } else {
            dispatch(logout());
        }
    } catch (err) {
        console.error(err);
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

export const checkAuthenticationStatus = (
    accessToken: string,
    refreshToken: string
): AppThunk => async (dispatch: Dispatch) => {
    const authServerInstance = generateAuthServerInstance({
        headers: {
            "Authorization": `Bearer ${accessToken} ${refreshToken}`
        }
    });

    try {
        const response = await authServerInstance.get("/");

        switch (response.status) {
            case 200:
                
                // Access Token expired, but refresh token was good, so new access token provided
                if (
                    (response.data && response.data.accessToken) &&
                    (response.data && response.data.refreshToken)
                ) {
                    console.log("new access token granted");
                    dispatch(login({}));
                } 
                
                // Access token was still good
                else {
                    console.log("access token was still good");
                    dispatch(login({}));
                }
                break

            // Can't authenticate the user
            default:
                console.log("server could not authenticate the user");
                dispatch(logout());
                break
        }
    } catch (err) {
        // Can't make a request to authenticate the user
        console.log("can't make a request");
        dispatch(logout());
    }
}

export const register = (
    username: string,
    password: string
): AppThunk => async (dispatch: Dispatch) => {
    const authServerInstance = generateAuthServerInstance({ headers: {} });

    try {
        const response = await authServerInstance.post("/register", {
            username,
            password
        })
        if (response.status === 200) {
            if (
                (response.data && response.data.accessToken) &&
                (response.data && response.data.refreshToken)
            ) {
                dispatch(login({
                    username,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }))
            }
        } else {
            dispatch(logout());
        }
    } catch (error) {
        console.error(error);
        dispatch(logout());
    }
}

/**
 * Selectors
 */
export const selectAuthenticated = (state: RootState) => state.auth.authenticated;
export const selectUsername = (state: RootState) => state.auth.username;

export default authSlice.reducer;
