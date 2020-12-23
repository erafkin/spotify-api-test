import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPlaylistOfGenres, savePlaylist } from '../actions';

const Playlist = (props) => {
  const [chosenGenres, changeChosenGenres] = useState([]);
  const [privatePlaylist, changePrivate] = useState(true);
  const [playlistTitle, changeTitle] = useState('');

  if (!props.user.user) {
    props.history.push('/');
    return (<div>you have been logged out</div>);
  }
  useEffect(() => {
    if (!props.playlist) {
      changePrivate(true);
      changeChosenGenres([]);
      changeTitle('');
    }
  }, [props.playlist]);
  return (
    <div>
      <h1>playlist page</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div style={{ display: 'inline-block', width: 'auto' }}>
          {props.genres.map((genre) => {
            return (
              <div role="button"
                style={{
                  width: '10vw', textAlign: 'center', backgroundColor: '#1DB954', color: 'white', padding: '10px', margin: '10px',
                }}
                onClick={() => {
                  let newGenres;
                  if (chosenGenres.includes(genre)) {
                    newGenres = chosenGenres.filter(e => e !== genre);
                  } else {
                    newGenres = [...chosenGenres];
                    newGenres.push(genre);
                  }
                  changeChosenGenres(newGenres);
                }}
                tabIndex={0}
                key={genre}
              >{genre}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'inline-block', width: 'auto', verticalAlign: 'top' }}>
          <p>chosen genres:</p>
          {chosenGenres.map((genre) => {
            return <p key={`genre${genre}`}>{genre}</p>;
          })}
        </div>
        <div style={{ display: 'inline-block', width: 'auto', verticalAlign: 'top' }}>
          <div
            tabIndex={0}
            role="button"
            style={{
              width: '10vw', textAlign: 'center', backgroundColor: '#1DB954', color: 'white', padding: '10px', margin: '10px',
            }}
            onClick={() => {
              props.getPlaylistOfGenres(chosenGenres);
            }}
          >
            see a playlist of these genres
          </div>
          {props.playlist
            ? (
              <div>
                {props.playlist.map((genreList) => {
                  return (
                    <div key={genreList.tracks.href}>
                      {genreList.tracks.items.map((track) => {
                        return (
                          <div key={track.href}>
                            {track.name} by {track.artists.map(artist => ` ${artist.name}`)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )
            : null
        }
        </div>
        {props.playlist
          ? (
            <div>
              <p>like this playlist? save it!</p>
              <p>name for playlist</p>
              <input type="text" name="title" value={playlistTitle} onChange={(event) => { changeTitle(event.target.value); }} className="title" />
              <p>make this playlist private? </p>
              <input type="checkbox"
                onClick={(event) => { changePrivate(event.target.checked); }}
                defaultChecked={privatePlaylist}
              />

              <div
                tabIndex={0}
                role="button"
                style={{
                  width: '10vw', textAlign: 'center', backgroundColor: '#1DB954', color: 'white', padding: '10px', margin: '10px',
                }}
                onClick={() => {
                  if (playlistTitle === '') {
                    // eslint-disable-next-line no-alert
                    alert('you must have a playlist title');
                  } else {
                    props.savePlaylist(playlistTitle, privatePlaylist);
                    // eslint-disable-next-line no-alert
                    alert('playlist created! go check it out on spotify!');
                  }
                }}
              >
                save this playlist
              </div>
            </div>
          )
          : null
        }
      </div>
    </div>

  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    genres: state.spotify.genres,
    playlist: state.spotify.playlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylistOfGenres: (genres) => {
      dispatch(getPlaylistOfGenres(genres));
    },
    savePlaylist: (title, privatePlaylist) => {
      dispatch(savePlaylist(title, privatePlaylist));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
