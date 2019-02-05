import { ModalActionType, AuthActionType } from "./actionTypes";
import Dexie from 'dexie';
const API = 'https://api.spotify.com/'
import db from '../db';


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
                Dexie.async(function* (dispatch) {
                    var f_tracks = [];
                    var arr = yield db.tracks.where({ user_id: params.user_id }).toArray();
                    yield arr.forEach((i) => {
                        f_tracks.push(i.track_id);
                    });

                    dispatch({
                        type: ModalActionType.OPEN_ALBUM,
                        payload: {
                            album,
                            f_tracks,
                            tracks :response
                        }
                    });
                })(dispatch)
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
