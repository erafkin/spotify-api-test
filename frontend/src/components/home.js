import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import {
  login, setUserFromLogin, getTopTracks, getTopArtists, getPlayer,
} from '../actions';


const Home = (props) => {
  const [albumArt, setAlbumArt] = useState('');
  const [currPlaying, setCurrPlaying] = useState();
  const [interval, setMyInterval] = useState();
  useEffect(() => {
    if (props.spotify.player && props.spotify.curr_track) {
      setAlbumArt(props.spotify.curr_track.data.album.images[0].url);
      setCurrPlaying(props.spotify.curr_track.data);
    }
  }, [props.spotify.player]);

  useEffect(() => {
    if (currPlaying && props.spotify.player) {
      clearInterval(interval);
      setMyInterval(setInterval(() => { props.getPlayer(); }, currPlaying.duration_ms - props.spotify.player.progress_ms + 2000));
    } else {
      clearInterval(interval);
    }
  }, [currPlaying]);
  useEffect(() => {
    if (props.user.user) {
      props.getTopArtists();
      props.getTopTracks();
      props.getPlayer();
    }
  }, [props.user]);

  useEffect(() => {
    if (window.location.href.includes('#') && !props.user.user) {
      const removeHostFromUrl = window.location.href.split('#');
      const vars = removeHostFromUrl[1].split('&');
      props.setUserFromLogin(vars[0], vars[1], vars[2], vars[3]);
    } else if (!props.user.user && !props.user.setting_user) {
      props.login();
    } else if (window.location.href.includes('#')) {
      props.history.push('/');
    }
  }, [props.user]);

  if (!props.user.user && !props.user.setting_user) {
    return (<div>please login</div>);
  } else if (!props.spotify.top_artists) {
    return (<div>loading...</div>);
  } else if (!window.location.href.includes('#')) {
    return (
      <div style={{ margin: '2vw' }}>
        <h1> Welcome, {props.user.user} </h1>
        <NavLink to="/playlist" style={{ textDecoration: 'none' }}>
          <div style={{
            width: '10vw', textAlign: 'center', backgroundColor: '#1DB954', color: 'white', padding: '10px', margin: '10px',
          }}
          >
            Make a playlist based off of your top genres
          </div>
        </NavLink>
        <div>
          <span style={{ fontWeight: '700' }}> Now Playing: { !currPlaying || currPlaying === '' ? 'none' : `${currPlaying.name} by ${currPlaying.artists.map(artist => ` ${artist.name}`)}`}</span>
        </div>
        <div>

          { !currPlaying || currPlaying === '' ? null : (
            <a href={currPlaying.external_urls.spotify} target="_blank" rel="noreferrer">
              <img src={albumArt} style={{ height: 150 }} alt="album cover" />
            </a>
          )}
        </div>
        <br />
        <br />
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
                      <span style={{ fontWeight: '700' }}>{artist.name}</span><br />
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
              {props.spotify.genres ? props.spotify.genres.map((genre) => {
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
    setUserFromLogin: (username, accessToken, refreshToken, userId) => {
      dispatch(setUserFromLogin(username, accessToken, refreshToken, userId));
    },
    getTopArtists: () => {
      dispatch(getTopArtists());
    },
    getTopTracks: () => {
      dispatch(getTopTracks());
    },
    getPlayer: () => {
      dispatch(getPlayer());
    },

  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home));
