let token;
let expiration;
const clientId = '2dd93fbe0a7446798235fa59134dd066';
const redirectURI = "http://localhost:3000/";
//const redirectURI = "https://jammming42.surge.sh/";

const Spotify = {

  getAccessToken() {
    // Checking and getting the access token.
    if (token) {
      return token;
    }
    const accessTokenURL = window.location.href.match(/access_token=([^&]*)/);
    const expirationTimeURL = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenURL && expirationTimeURL) {
      token = accessTokenURL[1];
      expiration = Number(expirationTimeURL[1]);
      window.setTimeout(() => token = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
      return token;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    // Verifying token
    const token = this.getAccessToken();
    // Activating search
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // Parsing a response
    .then(response => response.json()).then(jsonResponse => {
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  savePlaylist(name, trackURIs) {
    // Looking for info
    if (!name && !trackURIs) {
      return;
    }
    // Verifying token
    const token = this.getAccessToken();
    // Setting/Saving variables to Spotify
    const header = {
      Authorization: `Bearer ${token}`
    }
    let userID;
    return fetch('https://api.spotify.com/v1/me', {
      headers: header
    }).then(response => response.json()).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: header,
        method: 'POST',
        body: JSON.stringify({
          name: name
        })
      }).then(response => response.json()).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
          headers: header,
          method: 'POST',
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      });
    });
  }

}

export default Spotify;
