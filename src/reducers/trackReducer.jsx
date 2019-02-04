import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import without from 'lodash/without';

const initialState = {
    error: '',
    favorite_tracks: []
};

export const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.UNFAVORITE_TRACK:
            return {
                ...state
            };
        case ActionType.LIST_FAVORITES:
            return {
                ...state,
                favorite_tracks: action.payload
            };
        case ActionType.LIST_FAVORITES:
            return {
                ...state,
                favorite_tracks: []
            };
        default:
            return state;
    }
};