import axios from 'axios';

export const getTopTracks = (accessToken) => {
  return new Promise((resolve, reject) => {
    axios.get('https://api.spotify.com/v1/me/top/tracks', { headers: { Authorization: `Bearer ${accessToken}` } })
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
    axios.get('https://api.spotify.com/v1/me/top/artists', { headers: { Authorization: `Bearer ${accessToken}` } })
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
    axios.get('https://api.spotify.com/v1/me/player', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getCurrTrack = (token, url) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const searchGenre = (token, genre) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.spotify.com/v1/search/?q=${`genre:${genre}`}&type=track`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const createPlaylist = (title, privatePlaylist, token, userId) => {
  return new Promise((resolve, reject) => {
    console.log(title);
    console.log(privatePlaylist);
    console.log(token);
    console.log(userId);

    axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      name: title,
      public: !privatePlaylist,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      resolve(response);
    })
      .catch((error) => {
        console.log(error);
        reject(error.response);
      });
  });
};
export const addToPlaylist = (uris, playlistId, token) => {
  return new Promise((resolve, reject) => {
    axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { uris }, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
