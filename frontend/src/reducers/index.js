import { combineReducers } from 'redux';
import UserReducer from './user';
import SpotifyReducer from './spotify';

const rootReducer = combineReducers({
  user: UserReducer,
  spotify: SpotifyReducer,
});

export default rootReducer;
