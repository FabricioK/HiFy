import { ActionType, AuthActionType } from "./actionTypes";

const API = 'https://api.spotify.com/'
import db from '../db';

export const loadUser = (params) => {
    return (dispatch) => {
        dispatch({
            type: AuthActionType.USER_AUTH_START
        });
        fetch(`${API}v1/me?`, {
            headers: {
                'Authorization': `Bearer ${params.token}`
            }
        })
            .then(response => response.json())
            .then(
                (response) => {
                    if (response.error)
                        return dispatch({
                            type: AuthActionType.USER_AUTH_FAILURE,
                            payload: response.error.message
                        });

                    dispatch({
                        type: AuthActionType.USER_AUTH_SUCCESS,
                        payload: response
                    });
                }
                ,
                (error) => {
                    dispatch({
                        type: AuthActionType.USER_AUTH_FAILURE,
                        payload: error
                    })
                }
            )
    }
}

export const search = (params) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SEARCH_STARTED
        });
        fetch(`${API}v1/search?q=${params.query}&type=${params.type}&limit=${params.limit}&offset=${params.offset}`, {
            headers: {
                'Authorization': `Bearer ${params.token}`
            }
        })
            .then(response => response.json())
            .then(
                (response) => {
                    if (response.error)
                        return dispatch({
                            type: ActionType.SEARCH_FAILURE,
                            payload: response.error.message
                        });

                    dispatch({
                        type: ActionType.SEARCH_SUCCESS,
                        payload: response
                    });
                }
                ,
                (error) => {
                    dispatch({
                        type: ActionType.SEARCH_FAILURE,
                        payload: error
                    })
                }
            )
    }
}

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

export const addFavorite = (user_id, track) => {
    return (dispatch) => {
        db.tracks.add({
            user_id,
            track_id: track.track_id,
            name: track.name,
            album_name : track.album_name,
            artists_name : track.artists_name,
            album_images : track.album_images,
            external_urls : track.external_urls,
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

export const setToken = token => ({
    type: AuthActionType.LOGIN_SUCCESS,
    payload: token
});

export const logoff = () => ({
    type: AuthActionType.LOGOFF
});

export const toogleHover = (item, type) => ({
    type: ActionType.HOVER,
    payload: { item, type }
});

export const playButton = value => ({
    type: ActionType.PLAY,
    payload: value
});