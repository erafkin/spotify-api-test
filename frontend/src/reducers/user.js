import { ActionTypes } from '../actions';

const initialState = {
  user: null,
  userId: null,
  accessToken: null,
  refreshToken: null,
  setting_user: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SETTING_USER:
      return { ...state, setting_user: action.payload };
    case ActionTypes.SET_USER_AND_TOKENS:
      return {
        ...state, user: action.payload.user, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, userId: action.payload.userId,
      };
    default:
      return state;
  }
};

export default UserReducer;
