import { ActionType, AuthActionType } from "./actionTypes";

const API = 'https://api.spotify.com/'

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