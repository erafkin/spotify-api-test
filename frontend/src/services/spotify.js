import axios from 'axios';
import { DEV_URL } from '../constants';

const URL = `${DEV_URL}/spotify`;

export const getTopTracks = (accessToken) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/top/tracks/${accessToken}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getTopArtists = (accessToken) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/top/artists/${accessToken}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getPlayer = (token) => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/player/${token}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
