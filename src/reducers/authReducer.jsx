import { AuthActionType } from "../actions/actionTypes";

const initialState = {
    auth_api: 'https://accounts.spotify.com/authorize',
    client_id: '',
    redirect_uri: 'http://localhost:8080',
    scopes : 'user-read-private user-read-email',
    token: null,
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