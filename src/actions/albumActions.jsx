import { ModalActionType, AuthActionType } from "./actionTypes";
import db from '../db';

const API = 'https://api.spotify.com/'



const fetech_tracks = (dispatch, params, album) => {

    fetch(`${API}v1/albums/${params.id}/tracks`, {
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
                let tracks = response;
                dispatch({
                    type: ModalActionType.OPEN_ALBUM,
                    payload: {
                        album,
                        tracks
                    }
                });
            });
}

export const openAlbum = params => {
    return (dispatch) => {
        fetch(`${API}v1/albums/${params.id}`, {
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
                    fetech_tracks(dispatch, params, response);
                },
                (error) => {
                    dispatch({
                        type: ModalActionType.OPEN_ALBUM_ERROR,
                        payload: error
                    })
                }
            )
    }
};

export const closeAlbum = () => ({
    type: ModalActionType.CLOSE_ALBUM
});
