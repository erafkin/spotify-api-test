import * as userRequests from '../services/user';
import {DEV_URL} from '../constants'
const ActionTypes = {
    SET_USER: 'SET_USER',
    SET_USER_AND_TOKENS: 'SET_USER_AND_TOKENS',
    // flag to handle any errors that arise
    API_ERROR: 'API_ERROR',
  };

const login = () => {
    return (dispatch, getState) => {
        if(!getState().user.user){
            window.location = `${DEV_URL}/auth/login`;
        } else {
            // dispatch({type: SET_USER, payload: response});
        }
    }
}
const setUser = (username) => {
    return(dispatch) => {
        // remember to pass in access_token and refresh_token.
        dispatch({type: ActionTypes.SET_USER_AND_TOKENS, payload: {username}});
    }
   
}
export {
    ActionTypes,
    login,
    setUser
};