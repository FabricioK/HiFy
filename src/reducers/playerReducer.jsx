import { ActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import without from 'lodash/without';

const initialState = {
    playing: false,
    searching: false,
    artists: [],
    albuns: [],
    tracks: [],
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
                artists: []
            };
        case ActionType.SEARCH_SUCCESS:
            const result = action.payload
            let artists = [];
            let albuns = [];
            let tracks = [];
            if (result.artists && result.artists.items) {
                const payload = orderBy(result.artists.items, ['popularity', 'images'], ['desc']);
                if (payload.length == 0)
                    return {
                        ...state,
                        searching: false
                    };;
                let index = 0;
                const miniaba = groupBy(payload, () => {
                    index++;
                    return (index > 1 && index < 6)
                })
                miniaba.false.splice(1, 0, { childs: miniaba.true });
                artists = miniaba.false
            }
            if (result.albuns && result.albuns.items) {
                const payload = orderBy(result.albuns.items, ['popularity', 'images'], ['desc']);
                if (payload.length == 0)
                    return {
                        ...state,
                        searching: false
                    };;
                let index = 0;
                const miniaba = groupBy(payload, () => {
                    index++;
                    return (index > 1 && index < 6)
                })
                miniaba.false.splice(1, 0, { childs: miniaba.true });
                albuns = miniaba.false
            }
            if (result.tracks && result.tracks.items) {
                const payload = orderBy(result.tracks.items, ['popularity', 'images'], ['desc']);
                if (payload.length == 0)
                    return {
                        ...state,
                        searching: false
                    };;
                let index = 0;
                const miniaba = groupBy(payload, () => {
                    index++;
                    return (index > 1 && index < 6)
                })
                miniaba.false.splice(1, 0, { childs: miniaba.true });
                tracks = miniaba.false
            }
            return {
                ...state,
                searching: false,
                artists,
                albuns,
                tracks,
            };
        case ActionType.SEARCH_FAILURE:
            return {
                ...state,
                searching: false,
                error: action.payload
            };
        case ActionType.HOVER:
            var { artists, albuns, tracks } = state
            if (action.payload == 'artists')
                artists = state.artists.map(item => {
                    return (item.childs ?
                        {
                            childs: item.childs.map(child => {
                                return child == action.payload ? { ...child, hover: !child.hover } : child
                            })
                        } :
                        item == action.payload ? { ...item, hover: !item.hover } : item)
                });

            return {
                ...state,
                artists,
                albuns,
                tracks
            }
        default:
            return state;
    }
};