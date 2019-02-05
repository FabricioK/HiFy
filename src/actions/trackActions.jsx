import { ActionType, AuthActionType } from "./actionTypes";
import db from '../db';


export const listFavorites = (user_id) => {
    return (dispatch) => {
        db.tracks.where('user_id').equals(user_id).toArray().then(
            (result) => {
                dispatch({
                    type: ActionType.LIST_FAVORITES,
                    payload: result
                })
            },
            (error) => {
                dispatch({
                    type: ActionType.LIST_FAVORITES_FAILURE,
                    payload: error
                })
            }
        )
    }
}
export const unfavorite = (id) => {
    return (dispatch) => {
        db.tracks.delete(id);
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
                            payload: track
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
                    image: track.images,
                    favorite: true,
                    hover: false,
                    external_urls: track.external_urls,
                    artists: track.artists
                }).then(
                    (result) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE,
                            payload: track
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
                    album_name: track.album_name,
                    artists_name: track.artists_name,
                    album_images: track.album_images,
                    external_urls: track.external_urls,
                    duration_ms: track.duration_ms
                }).then(
                    (result) => {
                        dispatch({
                            type: ActionType.ADDED_FAVORITE,
                            payload: track
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