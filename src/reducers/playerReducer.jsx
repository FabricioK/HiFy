import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';

const initialState = {
    playing: false,
    searching: false,
    list: [],
    error: ''
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
                error: '',
                list: []
            };
        case ActionType.SEARCH_SUCCESS:
            const payload = orderBy(action.payload, ['popularity', 'images'], ['desc'])
            return {
                ...state,
                searching: false,
                list: payload
            };
        case ActionType.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                error: action.payload
            };
        case ActionType.HOVER:
            return {
                ...state,
                list: state.list.map(item =>
                    item == action.payload ? { ...item, hover: !item.hover } : item)
            }
        default:
            return state;
    }
};