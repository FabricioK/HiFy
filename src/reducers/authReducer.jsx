import { AuthActionType } from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
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
        case AuthActionType.USER_AUTH_START:
            return {
                ...state,
                logging: true,
                error: action.payload
            };
        case AuthActionType.USER_AUTH_SUCCESS:
            localStorage.setItem('user', action.payload);
            return {
                ...state,
                logging: false,
                user: action.payload
            };
        case AuthActionType.USER_AUTH_FAILURE:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return {
                ...state,
                logging: false,
                user: null,
                token : null,
                error: action.payload
            };
        default:
            return state;
    }
};