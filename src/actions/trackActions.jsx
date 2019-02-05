import { ActionType, ModalActionType } from "./actionTypes";
import db from '../db';
import Dexie from 'dexie';

export const listFavorites = (user_id) => {
    return (dispatch) => {
        Dexie.async(function* (dispatch) {
            const artists = yield db.artists.where('user_id').equals(user_id).toArray();
            const albums = yield db.albums.where('user_id').equals(user_id).toArray();
            const tracks = yield db.tracks.where('user_id').equals(user_id).toArray();
            dispatch({
                type: ActionType.LIST_FAVORITES,
                payload: { artists, albums, tracks }
            });
        })(dispatch)
    }
}

export const unfavorite = (id, type) => {
    return (dispatch) => {
        switch (type) {
            case 'artist':
                db.artists.delete(id);
                break;
            case 'album':
                db.albums.delete(id);
                break;
            case 'track':
                db.tracks.delete(id);
                break;
            default:
                break;
        }
        dispatch({
            type: ActionType.UNFAVORITE_TRACK,
            payload: id
        })
    }

}

export const addFavorite = (user_id, track, type) => {
    return (dispatch) => {
        switch (type) {
            case 'track':
                db.tracks.add({
                    id: `${user_id}_${track.track_id}`,
                    user_id,
                    track_id: track.track_id,
                    name: track.name,
                    favorite: true,
                    album_name: track.album_name,
                    artists_name: track.artists_name,
                    album_images: track.album_images,
                    external_urls: track.external_urls,
                    duration_ms: track.duration_ms
                }).then(
                    (result) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE,
                            payload: track.track_id
                        })
                        dispatch({
                            type: ModalActionType.ADDED_FAVORITE_TRACK,
                            payload: track.track_id
                        })
                    },
                    (error) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE_FAILURE,
                            payload: error
                        })
                    }
                )
                break;
            case 'albums':
                db.albums.add({
                    id: `${user_id}_${track.album_id}`,
                    user_id,
                    album_id: track.album_id,
                    name: track.name,
                    image: track.image,
                    favorite: true,
                    hover: false,
                    external_urls: track.external_urls,
                    artists: track.artists
                }).then(
                    (result) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE,
                            payload: track.album_id
                        })
                        dispatch({
                            type: ModalActionType.ADDED_FAVORITE_ALBUM,
                            payload: track.album_id
                        })
                    },
                    (error) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE_FAILURE,
                            payload: error
                        })
                    }
                )
                break;
            case 'artists':
                db.artists.add({
                    id: `${user_id}_${track.artist_id}`,
                    user_id,
                    artist_id: track.artist_id,
                    name: track.name,
                    favorite: true,
                    image: track.image,
                    external_urls: track.external_urls
                }).then(
                    (result) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE,
                            payload: track.artist_id
                        })
                        dispatch({
                            type: ModalActionType.ADDED_FAVORITE,
                            payload: track.artist_id
                        })
                    },
                    (error) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE_FAILURE,
                            payload: error
                        })
                    }
                )
                break;
            default:
                dispatch({
                    type: ActionType.ADDED_FAVORITE_FAILURE,
                    payload: error
                })
        }
    }
}