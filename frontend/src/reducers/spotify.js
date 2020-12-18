import { ActionTypes } from '../actions';

const initialState = {
  top_tracks: null,
  top_artists: null,
  player: null,
};

const SpotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_TOP_ARTISTS:
      return { ...state, top_artists: action.payload };
    case ActionTypes.SET_TOP_TRACKS:
      return { ...state, top_tracks: action.payload };
    case ActionTypes.SET_PLAYER:
      return { ...state, player: action.payload };
    default:
      return state;
  }
};

export default SpotifyReducer;
