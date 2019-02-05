import { ModalActionType, AuthActionType } from "./actionTypes";
import Dexie from 'dexie';
const API = 'https://api.spotify.com/'
import db from '../db';

const fetech_albuns = (dispatch, params, artist) => {

    fetch(`${API}v1/artists/${params.id}/albums?limit=5`, {
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
                var wait = Dexie.async(function* (dispatch) {
                    var f_albums = [];
                    var arr = yield db.albums.where({ user_id: params.user_id }).toArray();
                    yield arr.forEach((i) => {
                        f_albums.push(i.album_id);
                    });

                    dispatch({
                        type: ModalActionType.OPEN_ARTIST,
                        payload: {
                            artist,
                            albums : response,
                            f_albums
                        }
                    });
                });
                wait(dispatch)
            });
}

export const openArtist = params => {
    return (dispatch) => {
        fetch(`${API}v1/artists/${params.id}`, {
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
                    fetech_albuns(dispatch, params, response);
                },
                (error) => {
                    dispatch({
                        type: AuthActionType.OPEN_ARTIST_ERROR,
                        payload: error
                    })
                }
            )
    }
};

export const closeArtist = () => ({
    type: ModalActionType.CLOSE_ARTIST
});

export const toogleHoverON = (item, type) => ({
    type: ModalActionType.HOVER_ARTIST_ON,
    payload: { item, type }
});
export const toogleHoverOFF = (item, type) => ({
    type: ModalActionType.HOVER_ARTIST_OFF,
    payload: { item, type }
});