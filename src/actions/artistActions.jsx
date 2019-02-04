import { ModalActionType, AuthActionType } from "./actionTypes";
import db from '../db';

const API = 'https://api.spotify.com/'



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
                let albums = response;
                dispatch({
                    type: ModalActionType.OPEN_ARTIST,
                    payload: {
                        artist,
                        albums
                    }
                });
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