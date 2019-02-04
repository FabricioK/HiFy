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
export const addFavorite = (user_id, track) => {
    return (dispatch) => {
        db.tracks.add({
            id: `${user_id}_${track.track_id}`,
            user_id,
            track_id: track.track_id,
            name: track.name,
            album_name: track.album_name,
            artists_name: track.artists_name,
            album_images: track.album_images,
            external_urls: track.external_urls,
            duration_ms: track.duration_ms
        }).then(
            (result) => {
                dispatch({
                    type: ActionType.ADDED_FAVORITE,
                    payload: result
                })
            },
            (error) => {
                dispatch({
                    type: ActionType.ADDED_FAVORITE_FAILURE,
                    payload: error
                })
            }
        )
    }
}