import { AuthActionType } from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem('token'),
    logging: false,
    error: ''
};
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthActionType.LOGIN_STARTED:
            return {
                ...state,
                logging: true,
                token: null
            };
        case AuthActionType.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                logging: false,
                token: action.payload
            };
        case AuthActionType.LOGIN_FAILURE:
            return {
                ...state,
                logging: false,
                error: action.payload
            };
        default:
            return state;
    }
};