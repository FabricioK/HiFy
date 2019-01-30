import { ActionType, AuthActionType } from "./actionTypes";

const API = 'https://api.spotify.com/'

export const search = (params) => {
    return (dispatch) => {
        dispatch({
            type: ActionType.SEARCH_STARTED
        });
        fetch(`${API}v1/search?q=${params.query}&type=${params.type}`, {
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
                        payload: response.artists.items
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

export const setToken = token => ({
    type: AuthActionType.LOGIN_SUCCESS,
    payload: token
});

export const toogleHover = index => ({
    type: ActionType.HOVER,
    payload: index
});

export const playButton = value => ({
    type: ActionType.PLAY,
    payload: value
});