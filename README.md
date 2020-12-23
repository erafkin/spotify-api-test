# a web app playing around with the spotify api

this is a full stack web app built with react and node/express that accesses the [spotify api](https://developer.spotify.com/documentation/). 
uses [passport-spotify](http://www.passportjs.org/packages/passport-spotify/) to expedite the auth process.

## run
to use clone this repo, cd into both the front and back ends and run `yarn install`
you will need to authorize your spotify developer account and get a client id and client secret. all three of these variables go into your `.env` file on the backend as follows:
```
CLIENT_ID={your_client_id}
CLIENT_SECRET={your_client_secret}
SECRET={any_secret_string}
```
## features
- spotify auth (gets account info such as username)
- now playing (if you are playing something)
- current top artists (medium term)
- current top tracks (medium term)
- current top genres (pulled from medium term top artists)
- allows you to create playlists from your top genres

am i embarrassed that glee cast is my current number 2 artist? no.
![screenshot of the home page](home.png)

![screenshot of the playlists](playlists.png)


## Live
live here [http://spotify-genre-playlists.surge.sh/](http://spotify-genre-playlists.surge.sh/)
