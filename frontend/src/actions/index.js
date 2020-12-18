import * as userRequests from '../services/user';
import * as spotifyRequests from '../services/spotify';

import { DEV_URL } from '../constants';

const ActionTypes = {
  SET_USER: 'SET_USER',
  SETTING_USER: 'SETTING_USER',
  SET_USER_AND_TOKENS: 'SET_USER_AND_TOKENS',

  SET_TOP_TRACKS: 'SET_TOP_TRACKS',
  SET_TOP_ARTISTS: 'SET_TOP_ARTISTS',
  SET_PLAYER: 'SET_PLAYER',
  // flag to handle any errors that arise
  API_ERROR: 'API_ERROR',
};

const login = () => {
  return (dispatch, getState) => {
    if (!getState().user.user) {
      window.location = `${DEV_URL}/auth/login`;
      dispatch({ type: ActionTypes.SETTING_USER, payload: true });
    }
  };
};
const getUser = (username) => {
  return (dispatch) => {
    userRequests.getUser(username)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_USER, payload: response.response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
const setUserFromLogin = (username, accessToken, refreshToken) => {
  return (dispatch) => {
    userRequests
      .getUser(username)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_USER_AND_TOKENS, payload: { user: response.response, accessToken, refreshToken } });
        dispatch({ type: ActionTypes.SETTING_USER, payload: false });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};

const getTopTracks = () => {
  return (dispatch, getState) => {
    spotifyRequests.getTopTracks(getState().user.accessToken)
      .then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.SET_TOP_TRACKS, payload: response.response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
const getTopArtists = () => {
  return (dispatch, getState) => {
    spotifyRequests.getTopArtists(getState().user.accessToken)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_TOP_ARTISTS, payload: response.response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
const getPlayer = () => {
  return (dispatch, getState) => {
    spotifyRequests.getPlayer(getState().user.accessToken)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_PLAYER, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
export {
  ActionTypes,
  login,
  setUserFromLogin,
  getUser,
  getTopTracks,
  getTopArtists,
  getPlayer,
};
