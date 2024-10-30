let authToken = '';
let expiresIn = 0;
const spotifyClientID = 'b4456a69a2b24b6495a39b18134d1a89';
const apiUrl = 'https://api.spotify.com/v1';
const redirectUri = 'http://localhost:3000/';
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

  // async fetchWithAuth(authToken, )

  async searchTrack(query) {
    const endpoint = '/search';
    const headers = { Authorization: `Bearer ${authToken}` };

    try {
      const response = await fetch(
        `${apiUrl}${endpoint}?q=${encodeURIComponent(query)}&type=track,album,artist`,
        {
          headers,
        },
      );
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
};

export default Spotify;
