import { ActionType } from "../actions/actionTypes";

const initialState = {   
    playing: false,
    searching: false,
    list: [],
    error : ''
};
export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.PLAY:
            const { playing } = state;
            return {
                ...state,
                playing: !playing
            };
        case ActionType.SEARCH_STARTED:
            return {
                ...state,
                searching: true,
                error :'',
                list: []
            };
        case ActionType.SEARCH_SUCCESS:
            return {
                ...state,
                searching: false,
                list: action.payload
            };
        case ActionType.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                error : action.payload
            };
        default:
            return state;
    }
};