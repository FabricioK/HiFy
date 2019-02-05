import { ModalActionType } from "../actions/actionTypes";
import orderBy from 'lodash/orderBy';
import includes from 'lodash/includes';

const initialState = {
    error: '',
    albumView: false,
    albumModal: null,
    tracksModal: null
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

export const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case ModalActionType.OPEN_ALBUM:
            var result = action.payload;
            var tracksModal = [];
            if (result.tracks && result.tracks.items) {
                tracksModal = orderBy(result.tracks.items, ['popularity', 'images'], ['desc'])
                    .map((track) => {
                        return {
                            track_id: track.id,
                            name: track.name,
                            favorite: includes(result.f_tracks, track.id),
                            album_name: result.album.name,
                            artists_name: track.artists.map(a => a.name).join(', '),
                            album_images: result.album.images ? result.album.images[0].url : null,
                            external_urls: track.external_urls.spotify,
                            duration_ms: _convertMS(track.duration_ms)
                        }
                    });
            }

            return {
                ...state,
                albumView: true,
                albumModal: result.album,
                tracksModal
            };
        case ModalActionType.ADDED_FAVORITE_TRACK:
            const id = action.payload;
            var tracksModal = state.tracksModal.map(item => {
                return (item.childs ?
                    {
                        childs: item.childs.map(child => {
                            return child.track_id == id ? { ...child, favorite: true } : child
                        })
                    } :
                    item.track_id == id ? { ...item, favorite: true } : item)
            });
            return {
                ...state,
                tracksModal
            };
        case ModalActionType.CLOSE_ARTIST:
            return {
                ...state,
                albumView: false,
                artistModal: null,
                albumsModal: null
            };
        default:
            return state;
    }
};