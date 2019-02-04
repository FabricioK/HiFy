import { ActionType, AuthActionType } from "./actionTypes";
import db from '../db';

const API = 'https://api.spotify.com/'
export const search = (params) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SEARCH_STARTED
        });
        fetch(`${API}v1/artists/${params.id}/albuns?limit=${params.limit}&offset=${params.offset}`, {
            headers: {
                'Authorization': `Bearer ${params.token}`
            }
        })
            .then(response => response.json())
            .then(
                (response) => {
                    if (response.error) {
                        if (response.error.status == 401)
                            dispatch({
                                type: AuthActionType.LOGOFF,
                                payload: null
                            });
                        return dispatch({
                            type: ActionType.ARTIST_SEARCH_FAILURE,
                            payload: response.error.message
                        });
                    }
                    dispatch({
                        type: ActionType.ARTIST_SEARCH_SUCCESS,
                        payload: response
                    });
                }
                ,
                (error) => {
                    dispatch({
                        type: ActionType.ARTIST_SEARCH_FAILURE,
                        payload: error
                    })
                }
            )
    }
}


export const listFavorites = (user_id) => {
    return (dispatch) => {
        db.artist.where('user_id').equals(user_id).toArray().then(
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