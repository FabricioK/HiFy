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

const _convertMS = (millisec) => {
    var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(seconds / 60);
    var hours = "";
    if (minutes > 59) {
        hours = Math.floor(minutes / 60);
        hours = (hours >= 10) ? hours : "0" + hours;
        minutes = minutes - (hours * 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    if (hours != "") {
        return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
}

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
                const payload = orderBy(result.artists.items, ['popularity', 'images'], ['desc'])
                    .map((artist) => {
                        return {
                            artist_id: artist.id,
                            name: artist.name,
                            popularity: artist.popularity,
                            image: artist.images && artist.images.length > 0 ? artist.images[0].url : null,
                            hover: false,
                            external_urls: artist.external_urls.spotify,
                            genres: artist.genres.join(', ')
                        }
                    });
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
                const payload = orderBy(result.albums.items, ['release_date'], ['desc'])
                .map((album) => {
                    return {
                        artist_id: album.id,
                        name: album.name,
                        image: album.images && album.images.length > 0 ? album.images[0].url : null,
                        hover: false,
                        external_urls: album.external_urls.spotify,
                        artists: album.artists.length > 1 ? 'Various artists' : album.artists[0].name
                    }
                });
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
                tracks = orderBy(result.tracks.items, ['popularity', 'images'], ['desc'])
                    .map((track) => {
                        return {
                            track_id: track.id,
                            name: track.name,
                            album_name: track.album.name,
                            artists_name: track.artists.map(a => a.name).join(', '),
                            album_images: track.album.images ? track.album.images[0].url : null,
                            external_urls: track.external_urls.spotify,
                            duration_ms: _convertMS(track.duration_ms)
                        }
                    });
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