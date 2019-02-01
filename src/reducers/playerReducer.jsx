import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import without from 'lodash/without';

const initialState = {
    playing: false,
    searching: false,
    artists: [],
    albums: [],
    tracks: [],
    error: '',
    favorite_tracks: []
};
export const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.PLAY:
            const { playing } = state;
            return {
                ...state,
                playing: !playing
            };
        case ActionType.LIST_FAVORITES:
            return {
                ...state,
                favorite_tracks: action.payload
            };
        case ActionType.LIST_FAVORITES:
            console.log(action.payload)
            return {
                ...state,
                favorite_tracks: []
            };
        case ActionType.SEARCH_STARTED:
            return {
                ...state,
                searching: true,
                error: '',
                artists: []
            };
        case ActionType.SEARCH_SUCCESS:
            const result = action.payload
            let artists = [];
            let albums = [];
            let tracks = [];

            //ARTISTS
            if (result.artists && result.artists.items) {
                const payload = orderBy(result.artists.items, ['popularity', 'images'], ['desc']);
                if (payload.length > 0) {
                    let index = 0;
                    const miniaba = groupBy(payload, () => {
                        index++;
                        return (index > 1 && index < 6)
                    })
                    miniaba.false.splice(1, 0, { childs: miniaba.true });
                    artists = miniaba.false
                }
            }
            //ALBUMS
            if (result.albums && result.albums.items) {
                const payload = orderBy(result.albums.items, ['release_date'], ['desc']);
                if (payload.length > 0) {
                    let index = 0;
                    const miniaba = groupBy(payload, () => {
                        index++;
                        return (index > 1 && index < 6)
                    })
                    miniaba.false.splice(1, 0, { childs: miniaba.true });
                    albums = miniaba.false
                }
            }
            //TRACKS
            if (result.tracks && result.tracks.items) {
                tracks = orderBy(result.tracks.items, ['popularity', 'images'], ['desc']);

            }
            return {
                ...state,
                searching: false,
                artists,
                albums,
                tracks,
            };
        case ActionType.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                error: action.payload
            };
        case ActionType.HOVER:
            let t_artists = state.artists;
            let t_albums = state.albums;
            //hover over artist
            if (action.payload.type == 'artists')
                t_artists = t_artists.map(item => {
                    return (item.childs ?
                        {
                            childs: item.childs.map(child => {
                                return child == action.payload.item ? { ...child, hover: !child.hover } : child
                            })
                        } :
                        item == action.payload.item ? { ...item, hover: !item.hover } : item)
                });
            //hover over album
            if (action.payload.type == 'albums')
                t_albums = t_albums.map(item => {
                    return (item.childs ?
                        {
                            childs: item.childs.map(child => {
                                return child == action.payload.item ? { ...child, hover: !child.hover } : child
                            })
                        } :
                        item == action.payload.item ? { ...item, hover: !item.hover } : item)
                });
            return {
                ...state,
                artists: t_artists,
                albums: t_albums
            }
        default:
            return state;
    }
};