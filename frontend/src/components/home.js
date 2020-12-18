import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';
import Button from 'react-bootstrap/Button';

import {
  login, setUserFromLogin, getTopTracks, getTopArtists,
} from '../actions';
import { getUser } from '../services/user';


const Home = (props) => {
  const [albumArt, setAlbumArt] = useState('');
  const [currPlaying, setCurrPlaying] = useState();
  const spotifyApi = new SpotifyWebApi();


  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        setCurrPlaying(response.item);
        setAlbumArt(response.item.album.images[0].url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (window.location.href.includes('#') && !props.user.user) {
      const removeHostFromUrl = window.location.href.split('#');
      const vars = removeHostFromUrl[1].split('&');
      props.setUserFromLogin(vars[0], vars[1], vars[2]);
    } else if (!props.user.user && !props.user.setting_user) {
      props.login();
    } else if (window.location.href.includes('#')) {
      props.history.push('/');
    }
  }, [props.user]);

  if (!props.user.user && !props.user.setting_user) {
    return (<div>please login</div>);
  } else if (!window.location.href.includes('#')) {
    if (props.user.accessToken) {
      spotifyApi.setAccessToken(props.user.accessToken);
      if (!currPlaying) {
        getNowPlaying();
      }
    }

    const tempGenres = {};
    let genres = [];
    if (props.spotify.top_artists) {
      props.spotify.top_artists.items.forEach((artist) => {
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

    return (
      <div style={{ margin: '2vw' }}>
        <h1> Welcome, {props.user.user.username} </h1>
        <div>
          Now Playing: { !currPlaying || currPlaying === '' ? 'none' : `${currPlaying.name} by ${currPlaying.artists.map(artist => ` ${artist.name}`)}`}
        </div>
        <div>
          <img src={albumArt} style={{ height: 150 }} alt="album cover" />
        </div>
        <br />
        <br />
        <div style={{
          verticalAlign: 'top', display: 'flex', justifyContent: 'space-between', marginRight: '5vw',
        }}
        >
          <Button onClick={() => { props.getTopTracks(); props.getTopArtists(); }}>
            get top stats
          </Button>

        </div>
        <div style={{
          verticalAlign: 'top', display: 'flex', justifyContent: 'space-between', marginRight: '5vw',
        }}
        >
          <div style={{ display: 'inline-block' }}>
            <h2>top tracks</h2>
            <div>
              {props.spotify.top_tracks ? props.spotify.top_tracks.items.map((track) => {
                return (
                  <div key={track.name}>
                    <p>
                      {track.name} by {track.artists.map((artist) => { return (` ${artist.name}`); })}
                    </p>
                    <img src={track.album.images[0].url} style={{ height: 150 }} alt="track album cover" />
                    <br />
                    <br />
                  </div>
                );
              }) : null}
            </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <h2>top artists</h2>
            <div>
              {props.spotify.top_artists ? props.spotify.top_artists.items.map((artist) => {
                return (
                  <div key={artist.name}>
                    <p>
                      {artist.name}<br />
                      genres: {artist.genres.map((genre) => { return (` ${genre}, `); })}
                    </p>
                  </div>
                );
              }) : null}
            </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <h2>top genres</h2>
            <div>
              {props.spotify.top_artists ? genres.map((genre) => {
                return (
                  <div key={genre}>
                    <p>
                      {genre}<br />
                    </p>
                  </div>
                );
              }) : null}
            </div>
          </div>
        </div>


      </div>
    );
  } else {
    return (<div>error</div>);
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    spotify: state.spotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(login());
    },
    setUserFromLogin: (username, accessToken, refreshToken) => {
      dispatch(setUserFromLogin(username, accessToken, refreshToken));
    },
    getUser: (username) => {
      dispatch(getUser(username));
    },
    getTopArtists: () => {
      dispatch(getTopArtists());
    },
    getTopTracks: () => {
      dispatch(getTopTracks());
    },
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));
