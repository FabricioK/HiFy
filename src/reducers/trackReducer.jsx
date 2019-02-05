import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import without from 'lodash/without';

const initialState = {
    error: '',
    favorite_artists: [],
    favorite_albums: [],
    favorite_tracks: [],
};

export const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.UNFAVORITE_TRACK:
            return {
                ...state
            };
        case ActionType.LIST_FAVORITES:
            const { artists, albums, tracks } = action.payload;
            return {
                ...state,
                favorite_tracks: tracks,
                favorite_artists: artists,
                favorite_albums: albums
            };
        default:
            return state;
    }
};