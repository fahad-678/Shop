import axios from "axios";
import { createContext, useReducer } from "react";

import {
    ACCOUNT_DETAILS_SUCCESS,
    ACCOUNT_DETAILS_FAIL,
} from "./accountActionTypes";
import { API_URL_ACC } from "../../../utils/apiURL";

export const authAccount = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    account: null,
    accounts: [],
    error: null,
    loading: false,
};

const accountReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            };
        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export const AuthAccount = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
    console.log(state);

    const getAccountDetails = async (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${state.userAuth?.token}`,
            },
        };
        try {
            const res = await axios.get(`${API_URL_ACC}/${id}`, config);
            console.log(res);
            if (res?.data?.status === "success") {
                dispatch({
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: res?.data?.data,
                });
            }
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: error?.response?.data?.message,
            });
        }
    };

    return (
        <authAccount.Provider
            value={{ getAccountDetails, account: state.account }}
        >
            {children}
        </authAccount.Provider>
    );
};
