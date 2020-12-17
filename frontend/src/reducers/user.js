import { ActionTypes } from '../actions';

const initialState = {
  user: null,
  access_token: null,
  refresh_token: null,
  setting_user: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
        return {...state, user: action.payload}
    case ActionTypes.SETTING_USER:
        return {...state, setting_user: action.payload}
    case ActionTypes.SET_USER_AND_TOKENS:
        return {...state, user: action.payload.user.response, access_token: action.payload.access_token, refresh_token: action.payload.refresh_token, }
    default:
      return state;
  }
};

export default UserReducer;
