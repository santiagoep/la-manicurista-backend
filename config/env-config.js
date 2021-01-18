require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  apis: {
    spotify: {
      baseURL: 'https://api.spotify.com/v1',
      endpoints: {
        getTracks: {
          method: 'get',
          uri:
            '/search?market={params.market}&q={params.query}&type=track&limit={params.limit}&offset={params.offset}'
        }
      },
      headers: {}
    },
    spotifyAccounts: {
      baseURL: 'https://accounts.spotify.com/api',
      endpoints: {
        refreshToken: {
          method: 'post',
          uri: '/token'
        }
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_ID_SECRET}`
        ).toString('base64')}`
      }
    }
  },
  keys: {},
  pagination: {
    defaultSize: process.env.PAGINATION_DEFAULT_SIZE,
    defaultPage: process.env.PAGINATION_DEFAULT_PAGE
  }
};
