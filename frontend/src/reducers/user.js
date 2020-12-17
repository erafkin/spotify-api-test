import { ActionTypes } from '../actions';

const initialState = {
  user: null,
  access_token: null,
  refresh_token: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
        return {...state, user: action.payload}
    case ActionTypes.SET_USER_AND_TOKENS:
        console.log(action.payload);
            return {...state, access_token: action.payload.access_token, refresh_token: action.payload.refresh_token, user: {username: action.payload.username}}
    default:
      return state;
  }
};

export default UserReducer;
