import * as userRequests from '../services/user';
import {DEV_URL} from '../constants'
const ActionTypes = {
    SET_USER: 'SET_USER',
    SETTING_USER: 'SETTING_USER',

    SET_USER_AND_TOKENS: 'SET_USER_AND_TOKENS',
    // flag to handle any errors that arise
    API_ERROR: 'API_ERROR',
  };

const login = () => {
    return (dispatch, getState) => {
        if(!getState().user.user){
            window.location = `${DEV_URL}/auth/login`;
            dispatch({type:ActionTypes.SETTING_USER, payload: true})
        }
    }
}
const getUser = (username) => {
    return (dispatch) => {
        userRequests.getUser(username)
        .then((response) => {
            dispatch({type: ActionTypes.SET_USER, payload: response.response});
        })
        .catch((error) => {
            dispatch({type: ActionTypes.API_ERROR})
        })
    }
}
const setUserFromLogin = (username, access_token, refresh_token) => {
    return(dispatch) => {
        userRequests
        .getUser(username)
        .then((response) => {
            dispatch({type: ActionTypes.SET_USER_AND_TOKENS, payload: {user: response, access_token, refresh_token}});
            dispatch({type: ActionTypes.SETTING_USER, payload: false})
        })
        .catch((error) => {
            dispatch({type: ActionTypes.API_ERROR})
        })
    }
}
export {
    ActionTypes,
    login,
    setUserFromLogin,
    getUser
};