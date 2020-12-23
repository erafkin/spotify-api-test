import * as spotifyRequests from '../services/spotify';

import { DEV_URL } from '../constants';

const ActionTypes = {
  SET_USER: 'SET_USER',
  SETTING_USER: 'SETTING_USER',
  SET_USER_AND_TOKENS: 'SET_USER_AND_TOKENS',
  SET_PLAYLIST: 'SET_PLAYLIST',
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

const setUserFromLogin = (username, accessToken, refreshToken, userId) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_AND_TOKENS,
      payload: {
        user: username, accessToken, refreshToken, userId,
      },
    });
    dispatch({ type: ActionTypes.SETTING_USER, payload: false });
  };
};

const getTopTracks = () => {
  return (dispatch, getState) => {
    spotifyRequests.getTopTracks(getState().user.accessToken)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_TOP_TRACKS, payload: response });
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
        const tempGenres = {};
        let genres = [];
        const topArtists = response;
        if (topArtists && topArtists.items) {
          topArtists.items.forEach((artist) => {
            artist.genres.forEach((genre) => {
              if (Object.keys(tempGenres).includes(genre)) {
                tempGenres[genre] += 1;
              } else {
                tempGenres[genre] = 1;
              }
            });
          });
          genres = [...Object.keys(tempGenres)].sort((a, b) => {
            if (tempGenres[a] < tempGenres[b]) return 1;
            if (tempGenres[a] > tempGenres[b]) return -1;
            return 0;
          });
        }
        dispatch({ type: ActionTypes.SET_TOP_ARTISTS, payload: { artists: response, genres } });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
const getPlayer = () => {
  return (dispatch, getState) => {
    const token = getState().user.accessToken;
    spotifyRequests.getPlayer(token)
      .then((response) => {
        spotifyRequests.getCurrTrack(token, response.item.href)
          .then((resp) => {
            dispatch({ type: ActionTypes.SET_PLAYER, payload: { player: response, curr_track: resp } });
          }).catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR });
          });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};
const getPlaylistOfGenres = (genres) => {
  return (dispatch, getState) => {
    const token = getState().user.accessToken;
    const newGenres = genres.map((genre) => {
      return `%22${genre.split(' ').join('%20')}%22`;
    });

    const promises = [];
    const playlist = [];
    newGenres.forEach((genre) => {
      promises.push(
        new Promise((resolve, reject) => {
          spotifyRequests.searchGenre(token, genre)
            .then((response) => {
              playlist.push(response.data);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        }),
      );
    });
    Promise.all(promises)
      .then((response) => {
        dispatch({ type: ActionTypes.SET_PLAYLIST, payload: playlist });
      }).catch((error) => {
        dispatch({ type: ActionTypes.API_ERROR });
      });
  };
};

const savePlaylist = (title, privatePlaylist) => {
  return (dispatch, getState) => {
    const token = getState().user.accessToken;
    const { userId } = getState().user;
    spotifyRequests.createPlaylist(title, privatePlaylist, token, userId)
      .then((createdPlaylist) => {
        const { playlist } = getState().spotify;
        const uris = [];
        playlist.forEach((genre) => {
          genre.tracks.items.forEach((track) => {
            uris.push(track.uri);
          });
        });
        spotifyRequests.addToPlaylist(uris, createdPlaylist.data.id, token)
          .then((response) => {
            dispatch({ type: ActionTypes.SET_PLAYLIST, payload: null });
          }).catch((error) => {
            dispatch({ type: ActionTypes.API_ERROR });
          });
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
  getTopTracks,
  getTopArtists,
  getPlayer,
  getPlaylistOfGenres,
  savePlaylist,
};
