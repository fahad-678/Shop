import React, { createContext, useReducer } from "react";
import axios from "axios";

import { API_URL_USER } from "../../../utils/apiURL";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    FETCH_PROFILE_FAIL,
    FETCH_PROFILE_SUCCESS,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./authActionTypes";

export const authContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    error: null,
    loading: false,
    profile: null,
};

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                userAuth: payload,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                userAuth: null,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
                ...state,
                error: null,
                loading: false,
                userAuth: payload,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                error: payload,
                loading: false,
                userAuth: null,
            };
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                profile: payload,
            };
        case FETCH_PROFILE_FAIL:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null,
            };
        case LOGOUT:
            localStorage.removeItem("userAuth");
            return {
                ...state,
                error: null,
                loading: false,
                userAuth: null,
            };
        default:
            return state;
    }
};

const AuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const loginUserAction = async (formData) => {
        const config = {
            headers: {
                "Content-Type ": "application/json",
            },
        };
        try {
            const res = await axios.post(
                `${API_URL_USER}/login`,
                formData,
                config
            );
            if (res?.data?.status === "success") {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data,
                });
            }
            console.log(res);
            window.location.href = "/dashboard";
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_FAILED,
                payload: error?.response?.data?.message,
            });
        }
    };
    const registerUserAction = async (formData) => {
        const config = {
            "Content-Type": "application/json",
        };
        try {
            const res = await axios.post(
                `${API_URL_USER}/register`,
                formData,
                config
            );
            if (res?.data?.status === "success") {
                dispatch({
                    payload: res?.data,
                    type: REGISTER_SUCCESS,
                });
            }
        } catch (error) {
            dispatch({
                payload: error?.response?.data?.message,
                type: REGISTER_FAIL,
            });
        }
        window.location.href = "/login";
    };
    const fetchProfileAction = async () => {
        const config = {
            headers: {
                "Content-Type ": "application/json",
                Authorization: `Bearer ${state?.userAuth?.token}`,
            },
        };
        try {
            const res = await axios.get(`${API_URL_USER}/profile`, config);
            if (res?.data) {
                dispatch({
                    type: FETCH_PROFILE_SUCCESS,
                    payload: res.data,
                });
            }
            console.log("Response", res);
        } catch (error) {
            dispatch({
                type: FETCH_PROFILE_FAIL,
                payload: error?.response?.data?.message,
            });
            console.log("Error", error);
        }
    };

    const logoutUserAction = async () => {
        dispatch({
            payload: null,
            type: LOGOUT,
        });
        window.location.href = "/login";
    };

    return (
        <authContext.Provider
            value={{
                registerUserAction,
                loginUserAction,
                userAuth: state,
                token: state?.userAuth?.token,
                fetchProfileAction,
                profile: state?.profile,
                error: state?.error,
                logoutUserAction,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export default AuthContext;
