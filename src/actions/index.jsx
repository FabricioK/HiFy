import { ActionType, AuthActionType } from "./actionTypes";
import Dexie from 'dexie';
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
                    if (response.error) {
                        if (response.error.status == 401)
                            dispatch({
                                type: AuthActionType.LOGOFF,
                                payload: null
                            });
                        return dispatch({
                            type: ActionType.SEARCH_FAILURE,
                            payload: response.error.message
                        });
                    }
                    var wait = Dexie.async(function* (dispatch) {
                        var f_tracks = [];
                        var f_artists = [];
                        var f_albums = [];
                        var arr = yield db.tracks.where({ user_id: params.user_id }).toArray();
                        yield arr.forEach((i) => {
                            f_tracks.push(i.track_id);
                        });
                        var arr = yield db.artists.where({ user_id: params.user_id }).toArray();
                        yield arr.forEach((i) => {
                            f_artists.push(i.artist_id);
                        });
                        var arr = yield db.albums.where({ user_id: params.user_id }).toArray();
                        yield arr.forEach((i) => {
                            f_albums.push(i.album_id);
                        });
                        response.f_tracks = f_tracks;
                        response.f_artists = f_artists;
                        response.f_albums = f_albums;
                        dispatch({
                            type: ActionType.SEARCH_SUCCESS,
                            payload: response
                        });
                    });
                    wait(dispatch)

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

export const setToken = token => ({
    type: AuthActionType.LOGIN_SUCCESS,
    payload: token
});

export const logoff = () => ({
    type: AuthActionType.LOGOFF
});

export const toogleHoverON = (item, type) => ({
    type: ActionType.HOVER_ON,
    payload: { item, type }
});
export const toogleHoverOFF = (item, type) => ({
    type: ActionType.HOVER_OFF,
    payload: { item, type }
});

export const playButton = value => ({
    type: ActionType.PLAY,
    payload: value
});