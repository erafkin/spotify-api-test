import { DEV_URL } from '../constants';
import axios from 'axios';

const LOGIN_URL = `${DEV_URL}/auth/login`;
const USER_URL = `${DEV_URL}/user`

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        axios.get(LOGIN_URL)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
}

export const getUser = (username) => {
    return new Promise((resolve, reject) => {
        axios.get(`${USER_URL}/${username}`)
        .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response);
          });
    })
}