let authToken = '';
let expiresIn = 0;
const spotifyClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const apiUrl = 'https://api.spotify.com/v1';
// const redirectUri = 'http://localhost:3000/';
const redirectUri = 'https://jammming-tpo.netlify.app';
const scope = 'playlist-modify-public';

const generateRandomString = (length) => {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  return Array.from({ length }, () =>
    charset.charAt(Math.floor(Math.random() * charset.length)),
  ).join('');
};

const Spotify = {
  getAccessToken() {
    // Return token if already present
    if (authToken) {
      return authToken;
    }

    // Check url for token if we were redirected from Spotify
    let hash = window.location.hash;
    const storedState = localStorage.getItem('state');
    if (hash && storedState) {
      const authParams = new URLSearchParams(hash.substring(1));
      const returnedState = authParams.get('state');
      if (storedState !== returnedState) {
        throw new Error('error during auth: mismatched state');
      }

      authToken = authParams.get('access_token');
      expiresIn = authParams.get('expires_in');

      // Set timeout to clear token when it expires
      setTimeout(() => {
        authToken = '';
      }, expiresIn * 1000);
      // Clean up URL and return token
      window.history.pushState({}, '', '/');

      return authToken;
    }

    // If no token, initiate Spotify authorization

    const state = generateRandomString(16);
    localStorage.setItem('state', state);

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('client_id', spotifyClientID);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('state', state);

    window.location = authUrl;
  },

  async searchTrack(query) {
    const endpoint = '/search';
    const headers = { Authorization: `Bearer ${authToken}` };
    const url = new URL(apiUrl + endpoint);
    url.searchParams.append('q', query);
    url.searchParams.append('type', 'track,album,artist');

    try {
      const response = await fetch(url, { headers });
      const jsonResponse = await response.json();

      const formattedResponse = jsonResponse.tracks.items.map((track) => {
        return {
          id: track.id,
          artist: track.artists[0].name,
          album: track.album.name,
          name: track.name,
        };
      });
      return formattedResponse;
    } catch (e) {
      console.log('Search error: ', e);
    }
  },

  async getUserId() {
    const userEndpoint = '/me';
    const userUrl = new URL(apiUrl + userEndpoint);
    const headers = { Authorization: `Bearer ${authToken}` };

    try {
      const response = await fetch(userUrl, { headers });
      const jsonResponse = await response.json();
      return jsonResponse.id;
    } catch (e) {
      console.log('User ID fetch error: ', e);
    }
  },

  async savePlaylist(playlist, playlistUris) {
    const userId = await this.getUserId();
    const createPlaylistEndpoint = `/users/${userId}/playlists`;
    const headers = { Authorization: `Bearer ${authToken}` };

    const createPlaylistUrl = new URL(apiUrl + createPlaylistEndpoint);
    let playlistId;
    try {
      const response = await fetch(createPlaylistUrl, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          name: playlist.name,
        }),
      });
      const jsonResponse = await response.json();
      playlistId = jsonResponse.id;
    } catch (e) {
      console.log('Playlist create error: ', e);
    }

    const addTracksToPlaylistEndpoint = `/playlists/${playlistId}/tracks`;
    const addTracksToPlaylistUrl = new URL(
      apiUrl + addTracksToPlaylistEndpoint,
    );
    const addTracksBody = {
      playlist_id: playlistId,
      uris: playlistUris,
    };

    try {
      const response = await fetch(addTracksToPlaylistUrl, {
        headers,
        method: 'POST',
        body: JSON.stringify(addTracksBody),
      });
      if (response.ok) {
        return;
      }
    } catch (e) {
      console.log('Playlist add tracks error: ', e);
    }
  },

  async getTrackPreview(trackId) {
    const headers = { Authorization: `Bearer ${authToken}` };
    const trackPreviewEndpoint = `/tracks/${trackId}`;

    const trackPreviewUrl = new URL(apiUrl + trackPreviewEndpoint);
    try {
      const response = await fetch(trackPreviewUrl, { headers });
      const jsonResponse = await response.json();
      const trackPreviewAudioUrl = jsonResponse.preview_url;
      
      return trackPreviewAudioUrl;
    } catch (e) {
      console.log('Error fetching track preview: ', e);
    }
  },
};

export default Spotify;
