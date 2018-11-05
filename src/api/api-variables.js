const API_URL = 'https://accounts.spotify.com/authorize?';
const CLIENT_ID = '7e9f6aed24064e409fd29975ed84ac2e';
const SCOPE = 'user-read-private user-read-email';
let TOKEN_EXCHANGE_SERVER_URL = 'https://spotify-oauth-server.herokuapp.com';

if (process.argv[2] === 'local')
  TOKEN_EXCHANGE_SERVER_URL = 'http://localhost:4343';

let REDIRECT_URL = '';
if (process.env.BABEL_ENV === 'development')
  REDIRECT_URL = 'http://localhost:5000/callback';
else
  REDIRECT_URL = 'http://localhost:5000/callback'; // TODO: Chage to GitHub Pages link when ready


export { API_URL, CLIENT_ID, REDIRECT_URL, SCOPE, TOKEN_EXCHANGE_SERVER_URL };