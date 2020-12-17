import { DEV_URL } from '../constants';
import axios from 'axios';

const LOGIN_URL = `${DEV_URL}/auth/login`;

export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        axios.get(LOGIN_URL)
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
}